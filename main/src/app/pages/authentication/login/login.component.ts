import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inject Router

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Xử lý phản hồi từ API ở đây
        if (response.success) {
          // Đăng nhập thành công, chuyển hướng đến trang chủ
          this.router.navigate(['/']);
        } 
      },
      (error) => {
        // Xử lý lỗi nếu có
        console.error('Đã xảy ra lỗi:', error);
        if (error.error && error.error.message) {
          // Nếu có thông báo lỗi trong đối tượng lỗi, hiển thị nó
          this.errorMessage = error.error.message;
        } else {
          // Nếu không có thông báo lỗi trong đối tượng lỗi, hiển thị thông báo lỗi mặc định
          this.errorMessage = 'Đã xảy ra lỗi khi thực hiện đăng nhập';
        }
      }
    );
  }
}
