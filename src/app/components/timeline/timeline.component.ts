import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItem, MonthMarker } from '@models/event.item';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-timeline-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) items: EventItem[] = [];
  @Input() initialIndex = 0;

  /** Ajustes finos */
  @Input() pointStepPx = 150;      // separación entre puntos de la línea superior
  @Input() cardGapPx = 28;        // separación entre tarjetas
  @Input() locale = 'es-CO';      // para labels de meses/días

  @Output() itemSelected = new EventEmitter<EventItem>();
  @Output() ctaClicked = new EventEmitter<EventItem>();

  @ViewChild('timelineViewport', { static: true }) timelineViewport!: ElementRef<HTMLElement>;
  @ViewChild('cardsViewport', { static: true }) cardsViewport!: ElementRef<HTMLElement>;

  normalized: (EventItem & { _date: Date })[] = [];
  monthMarkers: MonthMarker[] = [];

  currentIndex = 0;

  // calculados por layout
  viewportW = 0;
  cardWidthPx = 360;
  sidePaddingTimelinePx = 0;
  sidePaddingCardsPx = 0;

  // swipe/drag
  private isPointerDown = false;
  private startX = 0;
  private startIndex = 0;

  private ro?: ResizeObserver;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Espera a que el DOM tenga medidas reales
    requestAnimationFrame(() => {
      this.recomputeLayout();
      this.setIndex(this.clampIndex(this.initialIndex), false);

      // 🔴 fuerza render inicial
      this.cdr.detectChanges();
    });

    this.ro = new ResizeObserver(() => {
      this.recomputeLayout();
      this.setIndex(this.currentIndex, false);
      this.cdr.detectChanges(); // 🔴 CLAVE
    });

    this.ro.observe(this.cardsViewport.nativeElement);
    this.ro.observe(this.timelineViewport.nativeElement);
  }

  ngOnDestroy(): void {
    this.ro?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.normalized = (this.items ?? [])
        .map(it => ({ ...it, _date: this.toDate(it.date) }))
        .sort((a, b) => a._date.getTime() - b._date.getTime());

      this.monthMarkers = this.buildMonthMarkers(this.normalized, this.locale);
      this.currentIndex = this.clampIndex(this.currentIndex);
      // si todavía no está el view init, no pasa nada; se recalcula luego
      queueMicrotask(() => this.recomputeLayout());
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.recomputeLayout();
  }

  /** ============ API de navegación ============ */
  prev(): void {
    this.setIndex(this.currentIndex - 1);
  }

  next(): void {
    this.setIndex(this.currentIndex + 1);
  }

  setIndex(i: number, emit = true): void {
    const idx = this.clampIndex(i);
    this.currentIndex = idx;

    if (emit && this.normalized[idx]) {
      this.itemSelected.emit(this.normalized[idx]);
    }
  }

  onDotClick(i: number): void {
    this.setIndex(i);
  }

  onCta(item: EventItem) {
    this.ctaClicked.emit(item);
  }

  /** ============ Estilos calculados ============ */
  get timelineTrackStyle() {
    // padding para que el primer/último punto pueda centrarse
    const x = -(this.currentIndex * this.pointStepPx);
    return {
      transform: `translateX(${x}px)`,
      paddingLeft: `${this.sidePaddingTimelinePx}px`,
      paddingRight: `${this.sidePaddingTimelinePx}px`,
    };
  }

  get cardsTrackStyle() {
    const step = this.cardWidthPx + this.cardGapPx;
    const x = -(this.currentIndex * step);
    return {
      transform: `translateX(${x}px)`,
      paddingLeft: `${this.sidePaddingCardsPx}px`,
      paddingRight: `${this.sidePaddingCardsPx}px`,
      gap: `${this.cardGapPx}px`,
    };
  }

  markerLeftPx(marker: MonthMarker): string {
    // Se posiciona relativo al track (sin contar padding, porque el label vive dentro del track)
    // Por eso sumamos el padding para que caiga donde corresponde visualmente.
    const x = this.sidePaddingTimelinePx + marker.index * this.pointStepPx;
    return `${x}px`;
  }

  dotLeftPx(i: number): string {
    const x = this.sidePaddingTimelinePx + i * this.pointStepPx;
    return `${x}px`;
  }

  formatDay(d: Date): string {
    return new Intl.DateTimeFormat(this.locale, { day: '2-digit' }).format(d);
  }

  /** ============ Swipe / drag opcional ============ */
  onPointerDown(ev: PointerEvent) {
    this.isPointerDown = true;
    this.startX = ev.clientX;
    this.startIndex = this.currentIndex;
    (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
  }

  onPointerMove(ev: PointerEvent) {
    if (!this.isPointerDown) return;

    const dx = ev.clientX - this.startX;
    // Convertimos desplazamiento a "steps" del carrusel (según cards step)
    const step = this.cardWidthPx + this.cardGapPx;
    const moved = Math.round(-dx / step);
    this.currentIndex = this.clampIndex(this.startIndex + moved);
  }

  onPointerUp() {
    this.isPointerDown = false;
    // emitimos selección final
    if (this.normalized[this.currentIndex]) {
      this.itemSelected.emit(this.normalized[this.currentIndex]);
    }
  }

  /** ============ Helpers ============ */
  private recomputeLayout(): void {
    const cardsW = this.cardsViewport?.nativeElement?.clientWidth ?? 0;
    const timelineW = this.timelineViewport?.nativeElement?.clientWidth ?? 0;

    if (!cardsW || !timelineW) return;

    if (cardsW < 520) this.cardWidthPx = Math.min(240, cardsW - 48);
    else if (cardsW < 860) this.cardWidthPx = 280;
    else this.cardWidthPx = 340;

    this.sidePaddingTimelinePx = timelineW / 2;
    this.sidePaddingCardsPx = Math.max((cardsW - this.cardWidthPx) / 2, 0);

    // 🔴 CLAVE
    this.cdr.markForCheck();
  }

  private clampIndex(i: number): number {
    const max = Math.max((this.normalized?.length ?? 1) - 1, 0);
    return Math.min(Math.max(i, 0), max);
  }

  private toDate(v: string | Date): Date {
    if (v instanceof Date) return v;
    const d = new Date(v);
    return isNaN(d.getTime()) ? new Date() : d;
  }

  private buildMonthMarkers(arr: (EventItem & { _date: Date })[], locale: string): MonthMarker[] {
    const fmt = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    const markers: MonthMarker[] = [];
    let lastKey = '';

    arr.forEach((it, idx) => {
      const key = `${it._date.getFullYear()}-${it._date.getMonth()}`;
      if (key !== lastKey) {
        lastKey = key;
        // Capitaliza el mes (por estética)
        const label = fmt.format(it._date);
        markers.push({ label: label.charAt(0).toUpperCase() + label.slice(1), index: idx });
      }
    });

    return markers;
  }

  onCardClick(i: number): void {
    this.setIndex(i);
  }
}