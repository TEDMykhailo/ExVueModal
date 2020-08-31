<template>
  <div class="mt-3">
    <table class="table">
      <thead>
      <tr>
        <th scope="col" style="width: 100px">Name</th>
        <th scope="col" style="width: 150px">Surname</th>
        <th scope="col" style="width: 100px">Birth Date</th>
        <th scope="col" style="width: 150px">Phone</th>
        <th scope="col" style="width: 150px">Email</th>
        <th scope="col" style="width: 150px">Create/Update Date</th>
        <th scope="col" style="width: 150px">Edit</th>
        <th scope="col" style="width: 150px">Delete</th>
      </tr>
      </thead>
      <v-user
        v-for="(user, index) in value"
        :key="index"
        :index="index"
        :name="user.name"
        :surname="user.surname"
        :birthDate="user.birthDate"
        :phone="user.phone"
        :email="user.email"
        :createUpdate="user.createUpdate"
        @get-item-delete="getItemDelete($event)"
        @get-item-changed="getItemChanged($event)"
      />
    </table>
  </div>
</template>

<script>
  import {BModal} from 'bootstrap-vue'

  import VUser from "../user/user";

  export default {
    name: "list-users",
    props: {
      value: Array
    },
    components: {
      VUser,
      'b-modal': BModal,
    },
    data() {
      return {
        values: null,
      }
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      getItemDelete(value) {
        this.$emit("is-item-delete", value)
        return value;
      },
      getItemChanged(value) {
        this.$emit("is-item-changed", value)
        return value;
      }
    },
  }
</script>

<style scoped>

</style>
