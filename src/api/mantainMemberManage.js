import service from '@/utils/request'


export const getMantainMemberList = (data) => {
    return service({
        url: '/inspector/getInspectorList',
        method: 'post',
        data,
    })
}


export const registerMantainMember = (data) => {

    return service({
        url: '/inspector/createInspector',
        method: 'post',
        data,
    })
}

export const updateMantainMember = (data) => {

    return service({
        url: '/inspector/updateInspector',
        method: 'put',
        data,
    })
}


export const deleteMantainMember = (data) => {
    return service({
        url: '/inspector/deleteInspector',
        method: 'delete',
        data,
    })
}