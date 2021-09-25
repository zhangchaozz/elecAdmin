<template>
  <div class="components-container board">
    <el-row :gutter="60">
      <el-col :span="8"><Kanban ref="kanban1" :key="1" :kanbanId="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" v-on:showDialog="showDialog" /></el-col>
      <el-col :span="8"><Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" /></el-col>
      <el-col :span="8"><Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" /></el-col>
    </el-row>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="25%">
      <span>确认删除吗{{ delId }}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" @click="delOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'

export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      dialogVisible: false,
      delId: 0,
      preDelEle: null,
      kanbanId: 0,
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      list2: [
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 }
      ],
      list3: [
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 },
        { name: 'Mission', id: 11 }
      ]
    }
  },
  methods: {
    showDialog(kanbanId, ele) {
      this.dialogVisible = true
      this.preDelEle = ele
      this.delId = ele.id
      this.kanbanId = kanbanId
      console.log(this.kanbanId)
    },
    delOk(ele){
      var keyToKanban = {
        kanban1: this.$refs.kanban1
      }
      var kanbanId = "kanban"+this.kanbanId
      var kanbanObj = keyToKanban[kanbanId]

       
      this.dialogVisible = false
      if(kanbanObj && this.preDelEle){
        kanbanObj.doDeleteEle(this.preDelEle)
      }
      else{
        console.log("xiixixixix")
        console.log(kanbanObj)
        console.log(this.preDelEle)
        console.log(kanbanId)
      }
      console.log('hehehehehhe')
      console.log(ele)
    },
    delCancel(){
      this.dialogVisible = false
      console.log('hahahahha')
    }
  }
}
</script>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

