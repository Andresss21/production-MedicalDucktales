<script context="module">
    import { variables } from '../../variables';
    export async function load({ params, fetch, session, stuff }) {
      const url = variables.apiUri + `/users/${1}`;

      const response = await fetch(url);
  
      return {
        status: response.status,
        props: {
          data: response.ok && (await response.json())
        }
      };
    }
  </script>

<script>
    import Icon from '../../components/helpers/Icon.svelte';
    import { goto } from '$app/navigation';
    export let data;
    let result = null;
    let password = "";
    let newPassword = "";
    let confirmPassword = "";

    let algo = true;

    let now = new Date(), month, day, year;
	let dateString;

    async function  doValidate(){
        if(password === data.user.password){
            algo = false
        }
    }

    async function doPatch () {

        month = '' + (now.getMonth() + 1),
        day = '' + now.getDate(),
        year = now.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        dateString = [year, month, day].join('-');

        if(newPassword === confirmPassword){
            data.user.updatedAt=dateString
            data.user.password = newPassword

            const url = variables.apiUri + `/users/${data.user.id}`;
            console.log(dateString);
            console.log(JSON.stringify(data.user));
            const res = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(data.user),
                
            })
            
            const json = await res.json()
            result = JSON.stringify(json)
            goto('/')
        }
    }


</script>

<div class="card bg-neutral card-bordered w-100 m-auto">
    <div class="card-body text-neutral-content">
        <div class="overflow-x-auto">
            <div class="flex flex-col items-center">
                <div class="flex flex-wrap w-full mb-6">   
                
                    {#if algo == true}
                        <div class="flex flex-col justify-center items-center w-full" >
                            <label for="presentation" class="label">
                                <span class="label-text">Contraseña</span>
                            </label>
                            <input name="name" type="text" placeholder="Nombre..." class="input w-full max-w-xs" bind:value="{password}">
                        </div>
                        {:else}
                        <div class="flex justify-center items-center w-full" >
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label for="presentation" class="label">
                                    <span class="label-text">Contraseña</span>
                                </label>
                                <input name="name" type="text" placeholder="Nombre..." class="input w-full max-w-xs" bind:value="{newPassword}">
                            </div>
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label for="presentation" class="label">
                                    <span class="label-text">Contraseña</span>
                                </label>
                                <input name="name" type="text" placeholder="Nombre..." class="input w-full max-w-xs" bind:value="{confirmPassword}">
                            </div>
                        </div>
                    {/if} 

                    
                </div>
                
                
                
                  <div class="flex flex-col justify-center items-center w-full max-w-sm">  
                      
                    {#if algo == true}
                        <button class="btn btn-accent btn-block" on:click={doValidate}>
                            <Icon
                                name="lock"
                                width="1.5em"
                                height="1.5em"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                            <span class="ml-2">  
                                Validar
                            </span>
                        </button>
                        {:else}
                            <button class="btn btn-accent btn-block" on:click={doPatch}>
                                <Icon
                                    name="lock"
                                    width="1.5em"
                                    height="1.5em"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                />
                                <span class="ml-2">  
                                    Cambiar Contraseña
                                </span>
                            </button>
                    {/if}
                  </div>
            </div>
          </div>
    </div>
</div>
