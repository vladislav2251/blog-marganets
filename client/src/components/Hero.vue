<template>
     <section class="container space-y-20 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">

          <div class="flex flex-col items-center gap-4 text-center">
               <a href="https://www.facebook.com/desjatka1/" class="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
                    <font style="vertical-align: inherit;">
                         <font style="vertical-align: inherit;">Стежте за новинами у Facebook</font>
                    </font>
               </a>

               <h1 class="font-heading text-3xl font-black sm:text-3xl md:text-4xl lg:text5xl">Марганецький ліцей № 10 <br> Марганецької міської ради Дніпропетровської <br> області</h1>
               <p class="max-w-[48rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">Школа творчих, успішних, щасливих дітей</p>

          </div>

          <div class="grid gap-10">
               <div class="grid gap-4 grid-cols-2">
                    <div class="rounded-lg">
                         <img loading="lazy" class="rounded-lg w-full h-auto" src="/img/nobel-prize-2024.jpg" alt="nobel-prize">
                    </div> 

                    <div class="flex items-center text-center justify-center px-20">
                         <h2 class="font-bold text-[23px]">Нобелівські лекції з фізики 2023</h2>
                    </div>
               </div>

               <div class="grid gap-4 grid-cols-2">
                    <div class="flex items-center text-center justify-center px-20">
                         <h2 class="font-bold text-[23px]">НВК «Ліцей- СЗШ №10». Міжнародний день рідної мови 2022.</h2>
                    </div>

                    <div class="rounded-lg">
                         <img loading="lazy" class="rounded-lg w-full h-auto" src="/img/den-ridnoy-movi.jpg" alt="nobel-prize">
                    </div> 
               </div>


               <div class="grid gap-4 grid-cols-2">
                    <div class="rounded-lg">
                         <img loading="lazy" class="rounded-lg w-full h-auto" src="/img/den-sobornosty-ukraini.jpg" alt="nobel-prize">
                    </div> 

                    <div class="flex items-center text-center justify-center px-20">
                         <h2 class="font-bold text-[23px]">День Соборності 2022</h2>
                    </div>
               </div>
          </div>

          <div>
               <h2 class="font-heading text-3xl mb-10 font-black sm:text-3xl md:text-4xl text-center lg:text5xl">Міністерство освіти</h2>

               <div class="grid grid-cols-2 gap-4">
                    <router-link to="/" class="relative overflow-hidden rounded-lg project-container">
                         <img class="w-full h-auto transition-transform transform" src="/img/ministerstvo-osviti-nauki-ukrain.jpg" alt="photo">
                         <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                              <h3 class="text-xl font-bold">Міністерство освіти і науки України</h3>
                         </div>
                    </router-link>

                    <router-link to="/" class="relative overflow-hidden rounded-lg project-container">
                         <img class="w-full h-auto transition-transform transform" src="/img/imzo.jpg" alt="">
                         <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                              <h3 class="text-xl font-bold">Інститут модернізації змісту освіти</h3>
                         </div>
                    </router-link>
               </div>
          </div>

     </section>
</template>