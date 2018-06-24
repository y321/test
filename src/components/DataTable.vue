<template>
    <view-page>
        <!-- 左按钮区 -->
        <template slot="left-field">
            <el-button type="danger" icon="el-icon-circle-plus-outline" @click="addTodo">添加</el-button>
        </template>
        <!-- 搜索框 -->
        <template slot="search-field">
            <el-input v-model="searchStr" suffix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
        </template>
        <!-- 过滤条件区 -->
        <template slot="filter-field">
            <el-select v-model="filterType" placeholder="选择类型">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="status, index in statuses" :key="status" :label="status" :value="index"></el-option>
            </el-select>
            <el-date-picker v-model="filterDates" type="daterange" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker>
        </template>
        <!-- 右按钮区 -->
        <template slot="right-field">
            <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
            <el-button type="warning" icon="el-icon-upload2">导入</el-button>
            <el-button type="success" icon="el-icon-download">导出</el-button>
        </template>
        <!-- 表格区 -->
        <el-table :data="pagedData" @sort-change="sortChange">
            <el-table-column type="expand">
                <template slot-scope="scope">
                     <el-card header="事项备注">
                     {{scope.row.remarks}}
                    </el-card>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="name" sortable="custom"></el-table-column>
            <el-table-column label="地点" sortable="custom">
                <template slot-scope="scope">
                {{scope.row.place}}
                </template>
            </el-table-column>
            <el-table-column label="计划状态" sortable="custom">
                <template slot-scope="scope">
                 <el-tag :type="statusColors[scope.row.status]">{{statuses[scope.row.status]}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="开始时间" sortable="custom">
                <template slot-scope="scope">
                {{new Date(scope.row.starttime).toLocaleDateString()}}
                </template>
            </el-table-column>
            <el-table-column label="结束时间" sortable="custom">
                <template slot-scope="scope">
                {{new Date(scope.row.endtime).toLocaleDateString()}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button size="small" type="warning" icon="el-icon-edit"></el-button>
                <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :total="total" :current-page="currentPage" 
         :page-size="currentPageSize" :page-sizes="[3, 5]"
         layout="total, sizes, prev, pager, next, jumper"
         @size-change="pageSizeChange" @current-change="pageChange">
        </el-pagination>
        <!-- 编辑弹框 -->
        <edit-dialog :show="editShow" title="编辑计划" @close="closeEditDialog" @save="saveTodo"></edit-dialog>
        
</edit-dialog>
    </view-page>
</template>

<script>
import ViewPage from './ViewPage'
import EditDialog from './EditDialog'
export default{
    components: {
        ViewPage,
        EditDialog
    },
    data() {
        return{
            data: [],
            searchStr: '',
            filterType: '',
            filterDates: null,  // 新增
            statuses: ['未开始', '进行中', '搁置', '完成'],
            statusColors: ['info', 'primary', 'warning', 'success'],
            // 排序
            sortProp: '',
            sortOrder: '',
            // 分页
            currentPage: 1,
            currentPageSize: 3,
            editShow: false
        }
    },
    mounted() {
        this.update()
    },
    methods: {
        update() {
            this.$ajax.get('todos').then((res) => {
                if (res.data) {
                    this.data = res.data
                }
            }).catch(err => this.$notify({
                type: 'error',
                message: err
            }))
        },
        // 排序
        sortChange(column) {
            this.sortProp = column.prop
            this.sortOrder = column.order
        },
        // fenye
        pageSizeChange(size) {
            this.currentPageSize = size
        },
        pageChange(page) {
            this.currentPage = page
        },
        //弹框
        addTodo() {
            this.editShow = true
        },
        saveTodo() {
            this.closeEditDialog()
        },
        closeEditDialog() {
            this.editShow = false
        }
    },
    //负责过滤
    computed: {
         filtedData() {
            return this.data.filter((item) => {
                var reg = new RegExp(this.searchStr, 'i')
                return !this.searchStr || reg.test(item.name) || reg.test(item.place)
            }).filter((item) => {
                return this.filterType === '' || item.status === this.filterType
            }).filter((item) => {
                return !this.filterDates || (this.filterDates[0] <= new Date(item.starttime) && this.filterDates[1] >= new Date(item.endtime))
            })
        },
        // 排序
        sortedData() {
            if (!this.sortOrder || !this.sortProp || !this.filtedData || !this.filtedData.length) return this.filtedData
            var reverse = this.sortOrder == 'descending' ? -1 : 1
            switch (typeof this.filtedData[0][this.sortProp]) {
                case 'number':
                    return this.filtedData.sort((a, b) => {
                        return reverse * (a[this.sortProp] - b[this.sortProp])
                    })
                case 'string':
                    if (JSON.stringify(new Date(this.filtedData[0][this.sortProp])) !== 'null') {
                        return this.filtedData.sort((a, b) => {
                            return reverse * (new Date(a[this.sortProp]) - new Date(b[this.sortProp]))
                        })
                    } else {
                        return this.filtedData.sort((a, b) => {
                            var cmp = 0
                            if (a[this.sortProp] > b[this.sortProp]) cmp = 1
                            else if (a[this.sortProp] < b[this.sortProp]) cmp = -1
                            return reverse * cmp
                        })
                    }
            }
        },
        // fenye
        total() {
            return this.filtedData.length
        },
        pagedData() {
            return this.sortedData.slice((this.currentPage - 1) * this.currentPageSize, this.currentPage * this.currentPageSize)
        }
    }
}
</script>