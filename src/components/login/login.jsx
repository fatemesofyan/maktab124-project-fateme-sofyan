import React from 'react'

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          {/* کادر اصلی فرم */}
          <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md text-primaryDark">
            <h2 className="text-2xl font-bold text-center mb-6">ورود به حساب کاربری</h2>
    
            {/* فرم */}
            <form className="space-y-4">
              {/* فیلد ایمیل */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
    
              {/* فیلد پسورد */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  رمز عبور
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
    
              {/* دکمه ورود */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryDark transition duration-300"
              >
                ورود
              </button>
            </form>
    
            {/* لینک فراموشی رمز عبور */}
            <div className="mt-4 text-center">
              <a href="/forgot-password" className="text-accent hover:text-secondary transition">
                رمز عبور خود را فراموش کرده‌اید؟
              </a>
            </div>
          </div>
        </div>
      );
    };
