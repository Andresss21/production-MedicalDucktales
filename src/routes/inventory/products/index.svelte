<script context="module">
  import { variables } from '../../../variables';
  import Cookies from 'js-cookie';
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/inventories`;
    const token = Cookies.get('token');
    console.log(token);
    const response = await fetch(url, {
  method: 'GET',
  credentials: 'include',
  mode: 'no-cors',
  headers: {
    //'Access-Control-Allow-Origin' : '*',
    Authorization: `Bearer ` + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZWFuLnZpY0BnbWFpbC5jb20iLCJleHAiOjE2NTY5NzI5MDAsImlhdCI6MTY1NTY3NjkwMH0.MBXk3-g12kY4N3ZQ-WkoVG_Ok4mziIPBO7IOp6ZYMCxz7KaZxNGl0PkIFDBDL7uw7LVHWbOE49DuMomnx_5BxQ',
  },
  
});

    return {
      status: response.status,
      props: {
        data: response.ok && (await response.json())
      }
    };
  }
</script>
  
<script lang="ts">
  import { goto, invalidate } from "$app/navigation";
  import { each } from "svelte/internal";
  import Icon from '../../../components/helpers/Icon.svelte';
  export let data;
  console.log(data);
  let idToDelete = null;
  let result = null
	
	async function doDelete () {
    const url = variables.apiUri + `/products/${idToDelete}`;
    console.log(idToDelete);
		const res = await fetch(url, {
			method: 'DELETE',
		})
    invalidate('/inventory/products')
	}
</script>

<div class="card bg-neutral card-bordered">
  <div class="card-body text-neutral-content">
    <div class="card-title">
      <Icon
        name="home"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Tipo de Inventario 
      
      <a href="products/new" class="btn btn-accent ml-auto">
        <Icon
          name="plus"
          width="1.5em"
          height="1.5em"
          stroke="currentColor"
          strokeWidth="1"
        />
        Agregar Nuevo
      </a>
    </div>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th />
            <th>Nombre</th>
            <th>Presentacion</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {#each data as row, i}
          <tr>
            <th>{i+1}</th>
            <td>{row.product}</td>
            <td>{row.typeInventoryId}</td>
            <td>{row.stock}</td>
            <td
              class="text-sm text-gray-900 font-light whitespace-nowrap"
            >
              <div class="flex items-center w-full bg-neutral rounded-xl">
                <div
                  class="flex flex-auto tooltip tooltip-primary z-40"
                  data-tip="Ver"
                >
                  <a
                    href="/inventory/products/{row.id}"
                    class="flex flex-auto items-center justify-center py-4 hover:bg-primary rounded-xl text-neutral-content hover:text-primary-content"
                  >
                    <Icon
                      name="trello"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </a>
                </div>

                <div
                  class="flex flex-auto tooltip tooltip-warning z-40"
                  data-tip="Editar"
                >
                  <a
                    href="/inventory/products/edit/{row.id}"
                    class="flex flex-auto items-center justify-center py-4 hover:bg-warning rounded-xl text-neutral-content hover:text-warning-content"
                  >
                    <Icon
                      name="edit"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </a>
                </div>

                <div
                  class="flex flex-auto tooltip tooltip-error z-40"
                  data-tip="Eliminar"
                >
                  <label
                    for="delete-products"
                    class="flex flex-auto items-center justify-center py-4 hover:bg-error rounded-xl text-neutral-content hover:text-error-content"
                    on:click="{() => idToDelete = row.id}"
                    >
                    <Icon
                      name="trash-2"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </label>
                </div>
              </div>
            </td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="delete-products" class="modal-toggle">
    <div class="modal bg-white-500/75">
      <div class="modal-box w-11/12 max-w-5xl bg-accent">
        <h3 class="font-bold text-lg">Advertenvcia!</h3>
        <p class="py-4">Esta a punto de eliminar un elemento, esta seguro de quere eliminarlo?</p>
        <div class="modal-action">
          <label for="delete-products" class="btn btn-ghost">Cancelar</label>
          <label for="delete-products" class="btn btn-primary" on:click="{doDelete}">Eliminar</label>
        </div>
      </div>
    </div>
    
  </div>
</div>
