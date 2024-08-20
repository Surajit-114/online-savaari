import Cookie from "js-cookie";
interface SetCookie {
    name:string;
    value:string;
}

export function setCookie({name, value}:SetCookie){
    Cookie.set(name, value,  {
        secure: true,
        sameSite: "None",
        expires: 1,
      })
}

export function getCookie(name:string){
    return Cookie.get(name)
}