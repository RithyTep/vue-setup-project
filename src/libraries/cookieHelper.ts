const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()!.split(';').shift()! : '';
};

const setCookie = (name: string, value: string, expiredSec?: number): void => {
    let cookie = `${name}=${value};path=/`;
    if (expiredSec !== undefined) {
      const current = new Date();
      current.setTime(current.getTime() + expiredSec * 1000);
      cookie += `;expires=${current.toUTCString()}`;
    }
    document.cookie = cookie;
};

export default {
    getCookie,
    setCookie,
}