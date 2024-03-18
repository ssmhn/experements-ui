import {ResolverMethods} from "../repositories/base.repository";
import {api} from "./config";
import {AuthConfig} from "./auth-config";
import {LocalAnyType} from "../types/global";
import {account} from "./constants";

export class AuthRepository {
    static readonly defaultUrl = `${window.location.origin}${account}/`;

    static refreshToken(refreshToken: string) {
        return api[ResolverMethods.post](`${this.defaultUrl}${AuthConfig.keepAliveUrl}`, { refreshToken })
            .then((res) => res?.data)
            .then((res: LocalAnyType) => AuthConfig.saveTokens(res?.accessToken || '', res?.refreshToken || ''));
    }
}