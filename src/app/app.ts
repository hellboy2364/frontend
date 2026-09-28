import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  message = signal('');
  receivedData = signal('');

  constructor(private http: HttpClient) {}

  sendData(input: HTMLInputElement): void {
    const text = input.value;
    this.http.post<{ message: string }>('http://localhost:5000/api/data', { text })
      .subscribe({
        next: (res) => {
          this.message.set(res.message);
          input.value = '';
        },
        error: () => this.message.set('Ошибка при отправке данных на сервер')
      });
  }

  getData(): void {
    this.http.get<{ content: string }>('http://localhost:5000/api/data')
      .subscribe({
        next: (res) => this.receivedData.set(res.content),
        error: () => this.receivedData.set('Ошибка при получении данных')
      });
  }
}