import {prisma} from '../config'


export const createUser = async (userDTO: any) => {
    return prisma.user.create({
        data: userDTO
    })
}


export const getUsers = async () => {
    return prisma.user.findMany({
        include: {
            address: true,
            editor: true,
            author: true,
            authors: true,
            publishers: true
        },
        orderBy: {
            id: "asc"
        }
    })
}


export const getOneUser = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id
        },
        include: {
            address: true,
            editor: true,
            author: true,
            authors: true,
            publishers: true,
            books: true
        }
    })
}


export const deleteEditorId = async (editorId: number) => {
    try {
        return await prisma.user.update({
            where: {editorId},
            data: {
                editor: {
                    //disconnect: true,
                    disconnect: {id: editorId},
                }
                // editorId: null
            }
        })
    } catch {
        return
    }

}


export const updateUser = async (id: number, userDTO: any) => {
    return prisma.user.update({
        where: {id},
        data: userDTO,
        include: {
            address: true,
            editor: true,
            author: true,
            authors: true
        }
    })
}


export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: {id}
    })
}


export const createAddress = async (addressDTO: any) => {
    return prisma.address.create({data: addressDTO})
}

export const getAddress = async () => {
    return prisma.address.findMany()
}