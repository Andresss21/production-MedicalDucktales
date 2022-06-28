<script context="module">
    import { variables } from '../../../variables';
    export async function load({ params, fetch, session, stuff }) {
      const url = variables.apiUri + `/hospitals`;
  
      const response = await fetch(url);
  
      return {
        status: response.status, 
        props: {
          Optiondata: response.ok && (await response.json())
        }
      };
    }
  </script>
  
  <script lang="ts">
    import { goto } from '$app/navigation';
    import Icon from '../../../components/helpers/Icon.svelte';
    export let Optiondata
    let data = {
        user: {
        id: '',
        name: '',
        hospitalId: '',
        lastname: '',
        email: '',
        password: '',
        updatedAt: '',
        createdAt: '',
        role: ''
      }
    };
    let result = null
    let now = new Date(), month: string, day: string, year: number;
	  let dateString: string; 

      async function doPost () {
      const url = variables.apiUri + `/users`;

        month = '' + (now.getMonth() + 1),
        day = '' + now.getDate(),
        year = now.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        dateString = [year, month, day].join('-');

        data.user.createdAt = dateString;
        data.user.updatedAt = dateString;
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data.user),
        })
        
        const json = await res.json()
        result = JSON.stringify(json)
        console.log(result);
        goto('/users/users')
      }
  </script>
  
  <div class="card bg-neutral card-bordered w-100 lg:w-1/2 m-auto">
    <div class="card-body text-neutral-content">
  
      <div class="card-title">
        <a href="/users/users/" class="btn btn-active btn-ghost btn-xs">
          <Icon
            name="arrow-left"
            width="1.5em"
            height="1.5em"
            stroke="currentColor"
            strokeWidth="2"
          />
          Volver
        </a>
      </div>
  
      <div class="card-title mt-4">
        <Icon
          name="table"
          width="1.5em"
          height="1.5em"
          stroke="white"
          strokeWidth="1"
        />
        Agregar Usuario 
      </div>
      <div class="overflow-x-auto">
        <div class="flex flex-col items-center">
            <div class="flex flex-wrap w-full pl-5 mb-6">
                
                <div class="form-control w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="nombre" class="label">
                        <span class="label-text">Nombre</span>
                      </label>
                      <input name="nombre" class="textarea" placeholder="nombre" bind:value="{data.user.name}" >
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="apellido" class="label">
                        <span class="label-text">Apellido</span>
                      </label>
                      <input name="apellido" class="textarea" placeholder="apellido" bind:value="{data.user.lastname}" >
                </div>
            </div>
            <div class="flex flex-wrap w-full pl-5 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="correo" class="label">
                        <span class="label-text">Correo</span>
                      </label>
                      <input name="correo" class="textarea" placeholder="correo" bind:value="{data.user.email}" >
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Hospital</span>
                      </label>
                      <select name="type" class="select w-full max-w-xs" bind:value="{data.user.hospitalId}">
                        <option selected disabled>{data.user.hospitalId}</option>
                        {#each Optiondata.hospitals as row}
                          <option value="{row.name}">{row.name}</option>
                        {/each}
                      </select>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label for="presentation" class="label">
                        <span class="label-text">Rol</span>
                      </label>
                     <select name="type" class="select w-full max-w-xs" bind:value="{data.user.role}">
                         <option selected disabled>{data.user.role}</option>
                         <option value="Admin">Admin</option>
                         <option value="Normal">Normal</option>
                     </select>
                 </div>
              </div>
              <div class="form-control w-full max-w-xs w-100 mt-10">
                <button class="btn btn-accent btn-block" on:click={doPost}>
                  <Icon
                    name="edit"
                    width="1.5em"
                    height="1.5em"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <span class="ml-2">  
                    Crear usuario
                  </span>
                </button>
              </div>
        </div>
      </div>
    </div>
  </div>
  