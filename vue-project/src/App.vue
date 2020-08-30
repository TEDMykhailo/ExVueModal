<template>
  <div id="app">
    <h2>Users Table</h2>
    <v-add-or-change-user
      @set-value="setValue($event)"
      :titleValue="addUserTitle"
    />

    <list-users
      :value='paginationUsers'
      @is-item-delete="deleteItem($event)"
      @is-item-changed="changedItem($event)"
    />
    <div class="" style="text-align: center">
      <button v-for="p in pagination.pages"
              class="btn btn-light"
              @click.prevent="setPage(p)"
              style="margin-right: 5px">
        {{p}}
      </button>
    </div>
    <div>
      <p>
        {{pagination.startIndex + 1}} to {{pagination.endIndex + 1}}
      </p>
    </div>
  </div>
</template>

<script>
  import {BModal} from 'bootstrap-vue'

  import vAddOrChangeUser from './components/popup/v-add-or-change-user'
  import ListUsers from "./components/list-users/list-users";

  export default {
    name: 'app',
    components: {
      ListUsers,
      vAddOrChangeUser,
      'b-modal': BModal,
    },
    data() {
      return {
        isVisible: false,
        addUserTitle: 'Add',
        itemInPages: 10,
        pagination: {},
        users: [],
        paginationUsers: [],
      }
    },
    methods: {
      setValue(value) {
        this.users.unshift(value);

        localStorage.setItem('users', JSON.stringify(this.users));
        this.paginationUsers = this.paginate();
      },
      deleteItem(id) {
        this.users = this.users.filter((item, index) => index !== id)

        localStorage.setItem('users', JSON.stringify(this.users));
        this.paginationUsers = this.paginate();
      },
      changedItem(value) {
        this.users = this.users.map((user, index) => {
          if (index === value.index) {
            user = value
          }
          return user
        })

        localStorage.setItem('users', JSON.stringify(this.users));
        this.paginationUsers = this.paginate();
      },
      createPaginateArr(a, b) {
        let arr = [];
        for (a; a <= b; a++) {
          arr.push(a)
        }

        return arr
      },
      setPage(p) {
        this.pagination = this.paginator(this.users.length, p)
        this.paginationUsers = this.paginate();
      },
      paginate() {
        return this.users.slice(this.pagination.startIndex, this.pagination.endIndex + 1)
      },
      paginator(totalItems, currentPage) {
        let startIndex = (currentPage - 1) * this.itemInPages;
        let endIndex = Math.min(startIndex + this.itemInPages - 1, totalItems - 1)
        return {
          currentPage: currentPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: this.createPaginateArr(1, Math.ceil(totalItems / this.itemInPages))
        }
      },
    },
    beforeMount() {
      if (!!window.localStorage.users && window.localStorage.users.length > 0) {
        this.users = JSON.parse(window.localStorage.getItem('users'));
      }

      this.setPage(1);
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }
</style>
