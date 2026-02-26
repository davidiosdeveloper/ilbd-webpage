import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utils {
    private months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    public formatDateToReadable(dateStr: string): string {
        const [day, month, year] = dateStr.split('/').map(Number);
        return `${day} de ${this.months[month - 1]} de ${year}`;
    }

    public monthNumberToName(monthNum: number): string {
        return this.months[monthNum - 1] || '';
    }

    public capitalizeFirstLetter(str: string): string {
        if (!str) {
            return str; // Handles empty or null/undefined strings
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public formatMonthShort(d: Date) {
        return d.toLocaleString('es-CO', { month: 'short' }).replace('.', '').toUpperCase();
    }

    public day2Digits(d: Date) {
        return String(d.getDate()).padStart(2, '0');
    }

    public calculateReadingTime(html: string): number {
        const text = html.replace(/<[^>]*>/g, ''); // quitar etiquetas
        const words = text.trim().split(/\s+/).length;
        const wordsPerMinute = 200;

        return Math.ceil(words / wordsPerMinute);
    }

    public toDriveDirectUrl(url: string): string {
        // Caso /file/d/<id>/
        const match = url.match(/\/file\/d\/([^/]+)/);
        if (match?.[1]) return `https://drive.google.com/uc?export=download&id=${match[1]}`;

        // Caso id=... en query
        const idMatch = url.match(/[?&]id=([^&]+)/);
        if (idMatch?.[1]) return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;

        return url; // ya viene directa o es otro host
    }
}