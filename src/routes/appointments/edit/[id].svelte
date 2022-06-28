<script context="module">
  import { goto } from '$app/navigation';
  import Icon from "../../../components/helpers/Icon.svelte";
  import { variables } from '../../../variables';
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/appointments/${params.id}`;
    const url2 = variables.apiUri + `/products`;

    const response = await fetch(url);
    const response2 = await fetch(url2);

    return {
      status: response.status,
      status2: response2.status2,
      props: {
        appointment: response.ok && (await response.json()),
        products: response2.ok && (await response2.json()),
      }
    };
  }
</script>
<script lang="ts">
  export let appointment;
  export let products;

  let result = appointment.appointment;
  let result2 = products.inventories;
  let result3 = [];
  let data = null;
	
	async function doPatch () {
    const url = variables.apiUri + `/appointments/${result.id}`;
		const res = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(result),
		});
    
		const json = await res.json();
		data = JSON.stringify(json);
    goto('/appointments')
	}

  let newPrescription = {
    appointmentId: result.id,
    productId: null,
    dosis: "",
  };
  let idToDelete = null;
  
  async function doPostPrescription () {
    const url = variables.apiUri + `/prescriptions`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newPrescription),
    });
    
    const json = await res.json();
    data = JSON.stringify(json);

    newPrescription = {
      appointmentId: result.id,
      productId: null,
      dosis: "",
    };
    doGetPrescriptions();
  }

  async function doDelete() {
    const res = await fetch(variables.apiUri + `/prescriptions/${idToDelete}`, {
      method: "DELETE",
    });

    doGetPrescriptions();
  }

  async function doGetPrescriptions () {
    const url = variables.apiUri + `/prescriptions/appointment/${result.id}`;
    const res = await fetch(url);
    const json = await res.json();
    result3 = json.prescriptions;
  }
</script>
  
<input type="checkbox" id="my-modal-6" class="modal-toggle">
<div class="modal ">
  <div class="modal-box w-11/12 max-w-5xl bg-neutral">
    <div class="card-title mt-4">
      <Icon
        name="table"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Agregar producto 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="type" class="label">
            <span class="label-text">Producto</span>
          </label>
          <select name="type" class="select w-full max-w-xs" bind:value="{newPrescription.productId}">
            <option disabled selected value="{null}">Seleccionar...</option>
            {#each result2 as result}
              <option value={result.product}>{result.product}</option>
            {/each}
          </select>
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="address" class="label">
            <span class="label-text">Detalles</span>
          </label>
          <textarea name="dosis" class="textarea" placeholder="2 cada 8 horas..." bind:value="{newPrescription.dosis}"></textarea>
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-10">
          <label 
            for="my-modal-6" 
            class="btn btn-accent btn-block" 
            on:click="{doPostPrescription}" 
          >
            <Icon
              name="plus"
              width="1.5em"
              height="1.5em"
              stroke="currentColor"
              strokeWidth="1"
            />
            <span class="ml-2">  
              Agregar producto
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div> 


<div class="card bg-neutral card-bordered w-100 lg:w-1/2 m-auto">
  <div class="card-body text-neutral-content">

    <div class="card-title">
      <a href="/appointments" class="btn btn-active btn-ghost btn-xs">
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
        name="book-open"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Editar Cita
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">
          <label for="name" class="label" >
            <span class="label-text">Doctor</span>
          </label>
          <input type="text" class="input w-full max-w-xs" bind:value="{result.doctorId}" readonly>
          </div>
          <div class="form-control w-full max-w-xs w-100 pb-3">
            <label for="name" class="label" >
              <span class="label-text">Paciente</span>           
            </label>
            <input type="text" class="input w-full max-w-xs" bind:value="{result.patientId}" readonly>
          </div>
          <div class="form-control w-full max-w-xs w-100 ">
              <label for="name" class="label" >
                <span class="label-text">Estado</span>
              </label>
          </div>
          <div class="flex flex-col justify-center">
            <div class="form-check">
              <input 
                class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="radio" 
                name="appointmentStatus" 
                id="appointmentStatus1"
                value="1"
                checked="{result.status === 1}"
                on:click="{() => result.status = 1}"
              >
              <label class="form-check-label inline-block text-lg" for="appointmentStatus1">
                Pendiente
              </label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="radio" 
                name="appointmentStatus" 
                id="appointmentStatus2"
                value="2"
                checked="{result.status === 2}"
                on:click="{() => result.status = 2}"
              >
              <label class="form-check-label inline-block text-lg" for="appointmentStatus2">
                Cancelado
              </label>
            </div>
            <div class="form-check">
              <input  
                class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="radio" 
                name="appointmentStatus" 
                id="appointmentStatus3"
                value="3"
                checked="{result.status === 3}"
                on:click="{() => result.status = 3}"
              >
              <label class="form-check-label inline-block text-lg" for="appointmentStatus3">
                Completado
              </label>
            </div>
          </div>
          <div class="form-control w-full max-w-xs w-100 mt-5">
            <label for="address" class="label">
              <span class="label-text">Detalles</span>
            </label>
            <textarea name="details" class="textarea" placeholder="Alergias: lorem ipsum dolor..." bind:value="{result.details}"></textarea>
          </div>
        
        <div class="overflow-x-auto mt-5">
          <div class="form-control w-full max-w-xs w-100">
            <label for="name" class="label" >
              <label for="my-modal-6" class="btn modal-button btn-xs">Agregar medicamentos</label>
            </label>
          </div>
          {#if result3.length > 0}
            <table class="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Producto</th>
                  <th>Dosis</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {#each result3 as row, i}
                  <tr> 
                    <th>{i+1}</th>
                    <td>{row.productId}</td>
                    <td>{row.dosis}</td>
                    <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                      <div class="flex items-center w-full bg-neutral rounded-xl">
                        <div
                          class=" flex flex-auto tooltip tooltip-error z-40"
                          data-tip="Eliminar"
                        >
                          <label
                            for="delete-prescription"
                            class="flex flex-auto items-center justify-center py-4 hover:bg-error rounded-xl text-neutral-content hover:text-error-content"
                            on:click={() => (idToDelete = row.id)}
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
          {/if}
        </div>
        
        <div class="form-control w-full max-w-xs w-100 mt-10">
          <button class="btn btn-accent btn-block" on:click={doPatch}>
            <Icon
              name="plus"
              width="1.5em"
              height="1.5em"
              stroke="currentColor"
              strokeWidth="1"
            />
            <span class="ml-2">  
              Editar Cita
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="delete-prescription" class="modal-toggle" />
<div class="modal bg-white-500/75">
  <div class="modal-box w-11/12 max-w-5xl bg-error">
    <h3 class="font-bold text-lg">Advertenvcia!</h3>
    <p class="py-4">
      Esta a punto de eliminar un elemento, esta seguro de quere eliminarlo?
    </p>
    <div class="modal-action">
      <label for="delete-prescription" class="btn btn-ghost">Cancelar</label>
      <label for="delete-prescription" class="btn btn-primary" on:click={doDelete}>
        Eliminar
      </label>
    </div>
  </div>
</div>
