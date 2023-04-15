import client from "../../module/api/customApi";
import { ILoginForm } from "./loginInterface";

const fetchLogin = async (loginForm: ILoginForm) => {
  const result = await client.post("/ldap-search", { ...loginForm });
  return result;
};

export { fetchLogin };
