<template>
  <div>
    <el-table :data="menuList" border style="width: 100%"  row-key="id"
    default-expand-all :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
          <el-button type="primary" @click="changeMenu(item.row.id)"  size='small'>编辑</el-button>
        <el-button type="danger" size='small' @click='del(item.row.id)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delMenu } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMenuList();
    console.log(...mapActions);
  },
  computed: {
    ...mapGetters({
      menuList:"menu/getMenuList",
    }),
  },

  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //封装删除事件
    del(id) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getMenuList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装编辑事件
    changeMenu(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
