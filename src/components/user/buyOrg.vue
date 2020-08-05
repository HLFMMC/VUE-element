<template>
    <div style="height: 100%;">
            <el-row>
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="form.userName" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phoneNum">
                        <el-input v-model="form.phoneNum" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="品种" prop="pType">
                        <el-select v-model="form.pType" size="small">
                            <el-option value="默科特">默科特</el-option>
                            <el-option value="脐橙">脐橙</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量" prop="pNum">
                        <el-input v-model="form.pNum" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="form.address" size="small" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="addPageInfo">确认提交</el-button>
            </el-row>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                addUrl:'http://nytlrj.hn3.mofasuidao.cn/epidemic/report',
                form:{
                    id:1,
                    userName:'',
                    address:'',
                    phoneNum:'',
                    pType:'默科特',
                    pNum:'1',
                    status:'已发货'
                },
                rules:{
                    userName:[{
                        required:true,message:'请输入姓名',trigger: 'blur'
                    }],
                    address:[{
                        required:true,message:'请输入地址',trigger: 'blur'
                    }],
                    phoneNum:[{
                        required:true,message:'请输入电话号码',trigger: 'blur'
                    }]
                }
            }
        },methods:{
            addPageInfo() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.addUrl,JSON.stringify(this.form),{emulateJSON: true})
                    .then((res)=>{
                        var data = res.data;
                        if(data.code == 1) {
                            this.$notify.success({
                                title: '成功',
                                message: data.message
                            });
                            
                            window.location.href='first'
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: data.message
                            });
                        }

                    },(res)=>{
                        this.$alert('服务器异常', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style type="text/css">
    .el-form .el-form-item {
        width:90%;
        margin-bottom:10px;
    }
    .el-row .el-button {
        margin-top: 30px;
        padding: 12px 40px;
        width: 80%;
    }
</style>