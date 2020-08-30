<template>
  <div>
    <b-button
      id="show-btn"
      class="btn btn-danger"
      @click="showModal"
    >Delete
    </b-button>

    <b-modal ref="my-modal" hide-header id="modal-md" size="md" title="Small Modal">
      Do you want to delete this user: <b>{{name}} {{surname}}</b>
      <template v-slot:modal-footer>
        <b-button
          variant="primary"
          class="float-right btn btn-danger"
          @click="agree"
        >
          Ok
        </b-button>
        <b-button
          variant="primary"
          class="float-right"
          @click="disagree"
        >
          Close
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import {BModal, BButton, VBModal} from 'bootstrap-vue'

  export default {
    name: "v-delete",
    props: {
      name: String,
      surname: String,
      index: Number
    },
    data() {
      return {}
    },
    components: {
      'b-modal': BModal,
      'b-button': BButton,
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      agree() {
        this.hideModal()

        this.$emit("is-agree", this.index)
      },
      disagree() {
        this.hideModal()
      }
    },
    beforeMount() {
      // console.log(this.title)
    },
  }
</script>

<style scoped>

</style>
