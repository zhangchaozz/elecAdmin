<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
      <div style="position:relative;right:0px;">
        <span style="float: right ;margin-top: -50px;margin-right:2px;" @click="deleteEle(element)">
          <i style="color:#ff4949" class="el-icon-circle-plus-outline" />
        </span>
      </div>
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
    >
      <div v-for="element in list" :key="element.id" class="board-item">
        {{ element.name }} {{ element.id }}
        <div style="position:relative;right:0px;">
          <span style="float: right ;margin-top: -70px;margin-right:2px;" @click="deleteEle(element)">
            <i style="color:#ff4949" class="el-icon-delete" />
          </span>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DragKanbanDemo',
  components: {
    draggable
  },
  props: {
    kanbanId:{
      type: Number,
      default: 0 
    },
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    isNotInList(v) {
      return this.list.every(k => v.id !== k.id)
    },
    deleteEle(ele) {
      console.log("deleteEle")
      console.log("this.key"+this.kanbanId)
      this.$emit("showDialog", this.kanbanId, ele)
    },
    doDeleteEle(ele) {
      for (const item of this.list) {
        if (item.id === ele.id) {
          const index = this.list.indexOf(item)
          this.list.splice(index, 1)
          break
        }
      }
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }

  }
}
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

