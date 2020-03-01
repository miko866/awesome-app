<template>
  <div>
    <h1>Dashboard</h1>

    <v-layout justify-center>
      <v-flex d-flex xs6 sm6 md6 lg6 xl6>
        <form method="POST">
          <v-text-field
            v-model="id"
            label="Id"
            required
            @input="$v.code.$touch()"
            @blur="$v.code.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="code"
            :error-messages="codeError"
            label="Code"
            required
            @input="$v.code.$touch()"
            @blur="$v.code.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>

          <p>Type</p>
          <v-switch v-model="type" label="Urban" value="URBAN"></v-switch>
          <v-switch v-model="type" label="Rular" value="RURAL"></v-switch>

          <v-btn @click="submit" color="success">submit</v-btn>
          <v-btn @click="clear" color="warning">clear</v-btn>
          <v-btn @click="showAll" color="warning" to="showAll">Show All</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
// import AuthenticationService from '@/auth/AuthenticationService';
import axios from 'axios';

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    code: { required }
  },

  data: () => ({
    id: null,
    name: '',
    code: '',
    type: ''
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    codeError() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.name.required && errors.push('Code is required.');
      return errors;
    }
  },

  methods: {
    async submit() {
      this.$v.$touch();

      console.log(this.id);
      console.log(this.name);
      console.log(this.code);
      console.log(this.type);

      const data = [{ id: parseInt(this.id), code: this.code, name: this.name, type: this.type }];

      console.log(JSON.stringify(data));

      // const payload = {
      //   data: 'topic',
      //   logs: fakeData
      // };

      let formData = new FormData();
      formData.append('id', parseInt(this.id));
      formData.append('code', this.code);
      formData.append('name', this.name);
      formData.append('type', this.type);

      axios
        .post('http://localhost:8080/locationweb/saveLoc', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          console.log(response);
        })
        .catch(() => {
          console.log('error');
        });

      // const response = await AuthenticationService.location({
      //   id: parseInt(this.id),
      //   code: this.code,
      //   name: this.name,
      //   type: this.type
      // });
      // console.log(response);
    },
    clear() {
      this.$v.$reset();
      this.id = null;
      this.name = '';
      this.code = '';
      this.type = '';
    }
  }
};
</script>

<style lang="scss" scoped></style>
