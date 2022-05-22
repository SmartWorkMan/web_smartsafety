import service from '@/utils/request'


// @Summary 用户注册
// @Produce  application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /safetyFactory/getSafeFactoryList [get]
export const getFactoryList = () => {
    return service({
        url: '/safetyFactory/getSafetyFactoryList',
        method: 'get'
    })
}

export const createFactory = (data) => { 
    return service({
        url: '/safetyFactory/createSafetyFactory',
        method: 'post',
        data: data
    })
}

export const deleteFactory = (data) => { 
    return service({
        url: '/safetyFactory/deleteSafetyFactory',
        method: 'delete',
        data: data
    })
}


