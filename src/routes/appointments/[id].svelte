<script context="module">
    import Icon from "../../components/helpers/Icon.svelte";
    import { variables } from '../../variables';
    export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/appointments/${params.id}`;
    const url2 = variables.apiUri + `/prescriptions/appointment/${params.id}`;
  
    const response = await fetch(url);
    const response2 = await fetch(url2);

    return {
    status: response.status,
    status2: response2.status2,
    props: {
        appointment: response.ok && (await response.json()),
        prescriptions: response2.ok && (await response2.json()),
    }
    };
}
</script>
<script lang="ts">
    export let appointment;
    export let prescriptions;

    let result = appointment.appointment;
    let result2 = prescriptions.prescriptions;
</script>

<div class="card bg-neutral card-bordered">

    <div class="card-body text-neutral-content">
        
        <div class="card-title ">
            <a href="/appointments" class="btn btn-ghost btn-xs"> <Icon name="arrow-left" width="1.5em" height="1.5em" stroke="white" strokeWidth="1" /> Volver</a>
            
        </div>
        <div class="card-title mt-4">
            Detalles Citas
        </div>
        <div class="overflow-x-auto">
            
            <div class="mb-4 md:flex ">
                <div class="mb-4 md:mr-2 md:mb-0">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Doctor</span>
                    </label>
                    <input type="text" class="block input border-0 w-full disabled focus:outline-none focus:ring-0" bind:value="{result.doctorId}" readonly>
                </div>
                <div class="mb-4 md:mr-2 md:mb-0">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Paciente</span>
                    </label>
                    <input type="text" class="block input border-0 w-full disabled focus:outline-none focus:ring-0" bind:value="{result.patientId}" readonly>
                </div>
                <div class="mb-4 md:mr-2 md:mb-0">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Fechas</span>
                    </label>
                    <input type="text" class="block input border-0 w-full disabled focus:outline-none focus:ring-0" bind:value="{result.date}" readonly>
                </div>
            </div>
            {#if result2.length > 0}
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Producto</th>
                            <th>Dosis</th>
                        </tr>
                    </thead>
                    <tbody>
                    {#each result2 as row, i}
                        <tr> 
                            <th>{i+1}</th>
                            <td>{row.productId}</td>
                            <td>{row.dosis}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {/if}
        </div>
    </div>

</div>