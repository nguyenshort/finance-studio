import {GET_USER} from "~/apollo/queries/user.query";
import {AdminUser} from "~/apollo/queries/__generated__/AdminUser";

export default defineNuxtRouteMiddleware(async (to) => {
    const { $apollo } = useNuxtApp()
    try {
        // @ts-ignore
        const { data } = await $apollo.defaultClient.query<AdminUser>({
            query: GET_USER,
            variables: {
                filter: {
                    id: to.params.id
                }
            }
        })
        if(!data.adminUser) {
            return abortNavigation()
        }
    } catch (e) {
        return abortNavigation()
    }

})
