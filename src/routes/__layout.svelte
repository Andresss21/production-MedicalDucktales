<script context="module">
  import { page } from "$app/stores";
  //import fetchIntercept from 'fetch-intercept';
  import Cookies from 'js-cookie';
  /**
   * Importamos e iniciamos la mock api
  */
  //import { makeServer } from "../hooks/mirage";

  //makeServer();
  /**
   * end de la mock api
  */

  /**
   * Inicializamos el fetch interceptor
  */

  /* const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        if(url.includes('/auth/')){
          return [url, config];
        }
        if (!config) {
          config = {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${Cookies.get('token')}`
            }
          };
          };
        
        config = {
          ...config,
          withCredentials: true,
          credentials: 'include',
          headers: {
            ...config.headers,
            'Authorization': `Bearer ${Cookies.get('token')}`,
          }
        };
        console.log(url, config);
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
  });
  unregister(); */
</script>

<script lang="ts">
  import type { MenuItem } from "../interfaces/Menu";
  import "../app.sass";
  import Icon from "../components/helpers/Icon.svelte";
  import Breadcrumb from "../components/helpers/Breadcrumbs.svelte";

  let currentSubmenu: MenuItem | null = null;

  let checked = false;

  function toggleChecked(
    action: string,
    selectedCategory: MenuItem | null = { name: "Home", icon: "home" }
  ) {
    if (selectedCategory.url) action = "close";
    checked = action === "open" ? true : false;
    if (!selectedCategory) return;
    if (selectedCategory.children) currentSubmenu = selectedCategory;
  }

  const menuItems: MenuItem[] = [
    {
      name: "Home",
      icon: "grid",
      url: "/",
    },
    {
      name: "Usuarios",
      icon: "users",
      children: [
        {
          name: "Doctores",
          icon: "user",
          url: "/users/doctors",
        },
        {
          name: "Pacientes",
          icon: "user",
          url: "/users/patients",
        },
        {
          name: "Users",
          icon: "user",
          url: "/users/users",
        },
      ],
    },
    {
      name: "Citas",
      icon: "calendar",
      url: "/appointments",
    },
    {
      name: "Inventario",
      icon: "archive",
      children: [
        {
          name: "Inventario de Productos",
          icon: "package",
          url: "/inventory/products",
        },
        {
          name: "Tipo de inventario de Productos",
          icon: "list",
          url: "/inventory/inventory_types",
        },
      ],

    },
    {
      name: "Hospitales",
      icon: "home",
      url: "/hospitals",
    },
    {
      name: "Horarios",
      icon: "calendar",
      url: "/shifts",
    },
    {
      name: "Especialidades",
      icon: "pen-tool",
      url: "/degrees",
    },
  ];
</script>


{#if ($page.url.pathname === '/login') || ($page.url.pathname === '/login/forgot') }
  <div>
    <slot />
  </div>
{:else}
<div class="min-h-screen w-screen flex bg-base-100">
  <!-- container -->
  <!-- First lvl menu -->
  <aside
    class="flex flex-col items-center bg-accent text-white shadow h-full min-h-screen"
  >
    <!-- Side Nav Bar-->

    <div class="h-16 flex items-center w-full">
      <!-- Logo Section -->
      <a class="h-6 w-6 mx-auto" href="https://www.isss.gob.sv/">
        <img
          class="h-6 w-6 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Logo_ISSS.svg/1862px-Logo_ISSS.svg.png"
          alt="isss logo"
        />
      </a>
    </div>

    <ul>
      {#each menuItems as menuItem}
        <!-- Items Section -->

        <li
          class="hover:bg-accent-focus tooltip tooltip-right tooltip-accent block z-50"
          data-tip={menuItem.name}
        >
          <a
            on:click={(event) => {
              toggleChecked("open", menuItem);
            }}
            href={menuItem.url ? menuItem.url : "#"}
            class="h-16 px-6 flex justify-center items-center w-full btn btn-accent"
          >
            <Icon
              name={menuItem.icon}
              width="1.5em"
              height="1.5em"
              stroke="currentColor"
              strokeWidth="2"
            />
          </a>
        </li>
      {/each}
    </ul>

    <div class="mt-auto h-16 flex items-center w-full">
      <!-- Action Section -->
      {#if false}
        <button
          class="h-16 w-10 mx-auto flex justify-center items-center focus:text-orange-500 hover:bg-red-200 focus:outline-none"
        >
          <svg
            class="h-5 w-5 text-red-700"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      {/if}
    </div>
  </aside>

  <div class="drawer">
    <input id="my-drawer" type="checkbox" {checked} class="drawer-toggle" />

    <div class="drawer-content">
      <!-- Page content here -->
      <!-- Main Section -->
      <div class="w-full">
        <div class="fixed z-50 w-full pr-24 pl-4 pt-4 bg-base-100/75">
          <div class="navbar bg-accent rounded-xl">
            <div class="flex-1">
              <a href="#" class="btn btn-accent normal-case text-xl">ISSS</a>
            </div>
            <div class="flex-none">
              {#if false}
                <div class="dropdown dropdown-end">
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        /></svg
                      >
                      <span class="badge badge-sm indicator-item">8</span>
                    </div>
                  </label>
                  <div
                    tabindex="0"
                    class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div class="card-body">
                      <span class="font-bold text-lg">8 Items</span>
                      <span class="text-info">Subtotal: $999</span>
                      <div class="card-actions">
                        <button class="btn btn-primary btn-block"
                          >View cart</button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              {/if}

              <div class="dropdown dropdown-end">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full">
                    <img src="https://api.lorem.space/image/face?hash=33791" />
                  </div>
                </label>
                <ul
                  tabindex="0"
                  class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="/profile" class="justify-between">
                      Profile
                      <span class="badge">New</span>
                    </a>
                  </li>
                  <li><a href="/login">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- body -->
        <main class="pt-24 px-8 h-body">
          <div class="card-title text-neutral-content"><Breadcrumb path={$page.url.pathname} /></div>
          <slot></slot>
        </main>
        <!-- body -->

        <!-- End Main Section -->
        <!-- Footer -->
        <footer
          class="footer items-center p-4 bg-neutral text-neutral-content mt-4"
        >
          <div class="items-center grid-flow-col">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              class="fill-current"
              ><path
                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
              /></svg
            >
            <p>Copyright © 2022 - All right reserved</p>
          </div>
          <div
            class="grid-flow-col gap-4 md:place-self-center md:justify-self-end"
          >
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-current"
                ><path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                /></svg
              >
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-current"
                ><path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                /></svg
              ></a
            >
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-current"
                ><path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                /></svg
              ></a
            >
          </div>
        </footer>
        <!-- End Footer -->
      </div>
    </div>
    <!-- second lvl menu-->
    <div class="drawer-side">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
        on:click={(event) => {
          toggleChecked("close");
        }}
        class="drawer-overlay"
      />
      <ul class="menu p-4 overflow-y-auto w-80 bg-neutral text-neutral-content">
        <!-- Sidebar content here -->
        {#if currentSubmenu}
          <h1>{currentSubmenu.name}</h1>
          {#each currentSubmenu.children as submenuItem}
            <li>
              <a href={submenuItem.url}>
                <Icon
                  name={submenuItem.icon}
                  width="1.5em"
                  height="1.5em"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                {submenuItem.name}
              </a>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>
{/if}


<style>
.h-body{
  min-height: calc(100vh - 85px);
}
</style>
