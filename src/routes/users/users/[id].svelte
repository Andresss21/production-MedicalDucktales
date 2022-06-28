<script context="module">
    import { variables } from '../../../variables';
    export async function load({ params, fetch, session, stuff }) {
      const url = variables.apiUri + `/users/${params.id}`;
      const response = await fetch(url);
  
      return {
        status: response.status,
        props: {
          data: response.ok && (await response.json())
        }
      };
    }
  </script>
  
  <script lang="ts">
    import Icon from '../../../components/helpers/Icon.svelte';
    export let data;
  </script>
  
  <div class="card bg-neutral card-bordered w-100 lg:w-1/2 m-auto">
    <div class="card-body text-neutral-content">
  
      <div class="card-title">
        <a href="/users/users" class="btn btn-active btn-ghost btn-xs">
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
          name="home"
          width="1.5em"
          height="1.5em"
          stroke="white"
          strokeWidth="1"
        />
        Detalle de usuario
      </div>
      <div class="overflow-x-auto">
        <div class="flex flex-col items-center">
            <div class="flex flex-wrap w-full pl-5 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Nombre</span>
                      </label>
                      <input name="presentation" class="textarea" placeholder="presentacion" value="{data.user.name}" disabled>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Apellido</span>
                      </label>
                      <input name="presentation" class="textarea" placeholder="presentacion" value="{data.user.lastname}" disabled>
                </div>
            </div>
            <div class="flex flex-wrap w-full pl-5 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Correo</span>
                      </label>
                      <input name="presentation" class="textarea" placeholder="presentacion" value="{data.user.email}" disabled>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Hospital</span>
                      </label>
                      <input name="presentation" class="textarea" placeholder="presentacion" value="{data.user.hospitalId}" disabled>
                </div>
            </div>
            <div class="flex flex-wrap w-full pl-5 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Fecha de actualizacion</span>
                      </label>
                      <input name="presentation" class="textarea" placeholder="presentacion" value="{data.user.updatedAt}" disabled>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Fecha de creacion</span>
                      </label>
                      <input name="presentation" class="textarea" placeholder="presentacion" value="{data.user.createdAt}" disabled>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label for="presentation" class="label">
                        <span class="label-text">Rol</span>
                      </label>
                      <input name="presentation" class="textarea" placeholder="presentacion" value="{data.user.role}" disabled>
                 </div>
              </div>
        </div>
      </div>
    </div>
  </div>
  