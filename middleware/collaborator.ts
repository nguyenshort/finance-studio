import {GetCollaborator} from "~/apollo/queries/__generated__/GetCollaborator";
import {GET_COLLABORATOR} from "~/apollo/queries/collaborator.query";

export default defineNuxtRouteMiddleware(async (to) => {
    const { $apollo } = useNuxtApp()
    try {
        // @ts-ignore
        const { data } = await $apollo.defaultClient.query<GetCollaborator>({
            query: GET_COLLABORATOR,
            variables: {
                filter: {
                    id: to.params.id
                }
            }
        })
        if(!data.collaborator) {
            return navigateTo('/collaborators')
        }
    } catch (e) {
        return navigateTo('/collaborators')
    }

})
