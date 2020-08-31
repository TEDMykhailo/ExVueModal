<template>
  <div>
    <b-button
      id="show-btn"
      @click="showModal"
      class="btn btn-outline-primary butt"
      variant="outline-primary"
    >{{titleValue}}
    </b-button>

    <b-modal ref="my-modal" hide-footer>
      <template v-slot:modal-header>
        <div class="w-100">
          <span class="float-left">{{titleValue + ' user'}}</span>
          <i
            type="button"
            aria-label="Close"
            class="close float-right closeFont"
            @click="closePopup"
          >
            <span aria-hidden="true">&times;</span>
          </i>
        </div>
      </template>
      <div class="d-block text-center">
        <form
          @submit.prevent="saveValue"
          id="formValue"
        >
          <div class="form-group row">
            <label for="text-input-name" class="offset-1 col-2 col-form-label">Name</label>
            <div class="offset-1 col-7">
              <input class="form-control"
                     type="text"
                     :placeholder="propsName ? propsName : 'Type your Name...'"
                     id="text-input-name"
                     v-model="name"
              />
              <small
                class="invalid"
                v-if="$v.name.$dirty && !$v.name.required"
              >TThe Name field must be changed</small>
              <small
                class="invalid"
                v-if="$v.name.$dirty && !$v.name.minLength"
              >Name must has more than 2 symbol</small>
              <small
                class="invalid"
                v-else-if="$v.name.$dirty && !$v.name.maxLength"
              >Name hasn't to has more than 60 symbol</small>
            </div>
          </div>
          <div class="form-group row">
            <label for="text-input-surname" class="offset-1 col-2 col-form-label">Surname</label>
            <div class="offset-1 col-7">
              <input class="form-control"
                     type="text"
                     :placeholder="propsSurname ? propsSurname : 'Type your Surname...'"
                     id="text-input-surname"
                     v-model="surname"
              />
              <small
                class="invalid"
                v-if="$v.surname.$dirty && !$v.surname.required"
              >The Surname field must be changed</small>
              <small
                class="invalid"
                v-if="$v.surname.$dirty && !$v.surname.minLength"
              >Name must has more than 2 symbol</small>
              <small
                class="invalid"
                v-else-if="$v.surname.$dirty && !$v.surname.maxLength"
              >Surname hasn't to has more than 60 symbol</small>
            </div>
          </div>
          <div class="form-group row">
            <label for="example-date-input" class="offset-1 col-2  col-form-label">Birth date</label>
            <div class="offset-1 col-7">
              <input class="form-control dateOfBirth"
                     type="date"
                     value="2011-08-19"
                     id="example-date-input"
                     v-model="birthDate"
              />
              <small
                class="invalid"
                v-if="$v.birthDate.$dirty && !$v.birthDate.required"
              >Birth Date field must be changed</small>
            </div>
          </div>
          <div class="form-group row">
            <label for="example-tel-input" class="offset-1 col-2  col-form-label">Phone</label>
            <div class="offset-1 col-7">
              <input class="form-control"
                     type="number"
                     :placeholder="propsPhone ? propsPhone : '1-(555)-555-5555'"
                     id="example-tel-input"
                     v-model="phone"
              />
              <small
                class="invalid"
                v-if="$v.phone.$dirty && !$v.phone.required"
              >Phone number field must be changed</small>
              <small
                class="invalid"
                v-if="($v.phone.$dirty && !$v.phone.minLength)"
              >Phone number must have 6 or more figure</small>
            </div>
          </div>
          <div class="form-group row">
            <label for="email" class="offset-1 col-2 col-form-label">Email</label>
            <div class="offset-1 col-7">
              <input type="email"
                     class="form-control centered"
                     id="email"
                     :placeholder="propsEmail ? propsEmail : 'Type your Email...'"
                     v-model="email"
              />
              <small
                class="invalid"
                v-if="$v.email.$dirty && !$v.email.required"
              >The Email field must be changed</small>
              <small
                class="invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
              >Email must have: @***.***</small>
            </div>
          </div>
        </form>
      </div>
      <b-button
        class="btn btn-outline-success"
        @click="saveValue"
        variant="outline-success"
        block
      >save
      </b-button>
      <b-button
        class="btn btn-outline-secondary"
        variant="outline-secondary"
        block
        @click="closePopup"
      >close
      </b-button>
    </b-modal>
  </div>
</template>

<script>
  import {BModal, BButton} from 'bootstrap-vue'
  import {email, required, integer, alpha, minLength, maxLength} from 'vuelidate/lib/validators'

  export default {
    name: "v-add-or-change-user",
    validations: {
      name: {required, minLength: minLength(2), maxLength: maxLength(60), alpha},
      surname: {required, minLength: minLength(2), maxLength: maxLength(60)},
      birthDate: {required},
      phone: {required, minLength: minLength(6), integer},
      email: {email, required}
    },
    data() {
      return {
        name: '',
        surname: '',
        birthDate: null,
        phone: null,
        email: '',
        createUpdate: null
      }
    },
    props: {
      titleValue: String,
      propsName: String,
      propsSurname: String,
      propsBirthDate: String,
      propsPhone: String,
      propsEmail: String,
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
      getData() {
        return {
          name: this.name,
          surname: this.surname,
          birthDate: this.birthDate,
          phone: this.phone,
          email: this.email,
          createUpdate: this.createUpdate
        }
      },
      revertValue() {
        this.name = undefined;
        this.surname = null;
        this.birthDate = null;
        this.phone = null;
        this.email = null;

        this.$v.$reset()
      },
      saveValue() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        this.createUpdate = this.dateCreateUpdate();

        this.hideModal();
        this.$emit("set-value", this.getData())
        this.revertValue();
      },
      closePopup() {
        this.revertValue();
        this.hideModal();
      },
      dateCreateUpdate() {
        return new Date().valueOf();
      }
    }
  }
</script>

<style scoped>
  .invalid {
    color: tomato;
  }

  .closeFont {
    font-family: Arial;
  }

  .dateOfBirth {
    margin-top: 12px;
  }
</style>
