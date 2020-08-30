<template>
  <tbody>
  <tr>
    <td class="clip"
        :title="name"
        style="max-width: 150px"
    >{{name}}
    </td>
    <td class="clip"
        :title="surname"
        style="max-width: 200px"
    >{{surname}}
    </td>
    <td class="clip"
        :title="birthDate"
        style="max-width: 100px"
    >{{birthDate}}
    </td>
    <td
      class="clip"
      :title="phone"
      style="max-width: 150px"
    >{{phone}}
    </td>
    <td class="clip"
        :title="email"
        style="max-width: 200px"
    >{{email}}
    </td>
    <td class="clip"
        :title="email"
        style="max-width: 200px"
    >{{formatDate()}}
    </td>
    <td>
      <v-add-or-change-user
        :titleValue="editUser"
        :propsName="name"
        :props-surname="surname"
        :propsBirthDate="birthDate"
        :propsPhone="phone"
        :propsEmail="email"
        @set-value="getChangedItem($event)"
      />
    </td>
    <td>
      <v-delete
        :name="name"
        :surname="surname"
        :index="index"
        @is-agree="isAgree($event)"
        @get-item-delete="isAgree"
      />
    </td>
  </tr>
  </tbody>

</template>

<script>
  import {BModal} from 'bootstrap-vue';

  import vDelete from "../popup/v-delete";
  import VAddOrChangeUser from "../popup/v-add-or-change-user";

  export default {
    name: "v-user",
    components: {
      VAddOrChangeUser,
      vDelete,
      'b-modal': BModal,
    },
    props: {
      index: Number,
      name: String,
      surname: String,
      birthDate: String,
      phone: String,
      email: String,
      createUpdate: Number
    },
    data() {
      return {
        editUser: 'Edit'
      }
    },
    methods: {
      formatDate() {
        const time = new Date(this.createUpdate)

        return time.getDate() + '.' +
          time.getMonth() + '.' +
          time.getFullYear() + ' ' +
          time.getHours() + ':' +
          time.getMinutes()
      },
      isAgree(value) {
        this.$emit("get-item-delete", value)
        return value;
      },
      getChangedItem(value) {
        value.index = this.index;
        this.$emit("get-item-changed", value)
        return value;
      }
    },
  }
</script>

<style scoped>
  .clip {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
