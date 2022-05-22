<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="small" type="primary" icon="plus" @click="addFactory">新建工厂</el-button>
      </div>
      <el-table
        :data="tableData"
        row-key="ID"
      >
        <!-- <el-table-column align="left" label="ID" min-width="50" prop="ID" /> -->
        <el-table-column align="left" label="工厂名" min-width="150" prop="factoryName" />
        <el-table-column align="left" label="工厂代码" min-width="150" prop="factoryId" />


        <el-table-column label="操作" min-width="250" fixed="right">
          <template #default="scope">
            <el-popover v-model:visible="scope.row.visible" placement="top" width="160">
              <p>确定要删除此工厂吗</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button size="small" type="text" @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" size="small" @click="deleteFactoryFunc(scope.row)">确定</el-button>
              </div>
              <template #reference>
                <el-button type="text" icon="delete" size="small">删除</el-button>
              </template>
            </el-popover>
            <!-- <el-button type="text" icon="edit" size="small" @click="openEdit(scope.row)">编辑</el-button> -->
            <!-- <el-button type="text" icon="magic-stick" size="small" @click="resetPasswordFunc(scope.row)">重置密码</el-button> -->
          </template>
        </el-table-column>

      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="addFactoryDialog"
      custom-class="user-dialog"
      title="工厂信息"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div style="height:60vh;overflow:auto;padding:0 12px;">
        <el-form ref="factoryForm" :rules="rules" :model="factoryInfo" label-width="80px">
          
          <el-form-item label="工厂名" prop="factoryName">
            <el-input v-model="factoryInfo.factoryName" />
          </el-form-item>
          <el-form-item label="工厂代码" prop="factoryId">
            <el-input v-model="factoryInfo.factoryId" placeholder="请输入英文代表公司"/>
          </el-form-item>

        </el-form>

      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeaddFactoryDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enteraddFactoryDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreateFactory',
}
</script>

<script setup>

import {
  createFactory,
  deleteFactory,
  getFactoryList,
} from '@/api/createFactory'


import { nextTick, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const path = ref(import.meta.env.VITE_BASE_API)


const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {

  const table = await getFactoryList({ page: page.value, pageSize: pageSize.value })
  console.log("table -----", table)
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

watch(tableData, () => {
})

const initPage = async() => {
  getTableData()

}

initPage()



const deleteFactoryFunc = async(row) => {
  const res = await deleteFactory({ id: row.ID })
  if (res.code === 0) {
    ElMessage.success('删除成功')
    row.visible = false
    await getTableData()
  }
}

// 弹窗相关
const factoryInfo = ref({
  factoryName: '',
  factoryId: '',

})

const rules = ref({
  factoryName: [
    { required: true, message: '请输工厂名', trigger: 'blur' },
    // { min: 5, message: '最低5位字符', trigger: 'blur' }
  ],
  factoryId: [
    { required: true, message: '请输入工厂代码', trigger: 'blur' },
    // { min: 6, message: '最低6位字符', trigger: 'blur' }
  ],
})
const factoryForm = ref(null)
const enteraddFactoryDialog = async() => {
  factoryForm.value.validate(async valid => {
   
    if (valid) {
      const req = {
        ...factoryInfo.value
      }
      if (dialogFlag.value === 'add') {
        const res = await createFactory(req)
        if (res.code === 0) {
          ElMessage({ type: 'success', message: '创建成功' })
          await getTableData()
          closeaddFactoryDialog()
        }
      }
    
    }
  })
}

const addFactoryDialog = ref(false)
const closeaddFactoryDialog = () => {
  factoryForm.value.resetFields()

  addFactoryDialog.value = false
}

const dialogFlag = ref('add')

const addFactory = () => {
  dialogFlag.value = 'add'
  addFactoryDialog.value = true
}


</script>

<style lang="scss">
.user-dialog {
  .header-img-box {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  border-radius: 20px;
  text-align: center;
  line-height: 200px;
  cursor: pointer;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.nickName{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.pointer{
  cursor: pointer;
  font-size: 16px;
  margin-left: 2px;
}
</style>
