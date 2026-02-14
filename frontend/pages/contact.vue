<template>
  <div class="bg-background-light text-gray-900 antialiased min-h-screen flex flex-col font-sans dark:bg-background-dark dark:text-gray-300">
      <AppHeader />
      <main class="flex-grow flex items-center justify-center py-20 px-6 lg:px-12">
      <div class="max-w-7xl w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div class="lg:col-span-5 flex flex-col justify-center space-y-12 lg:sticky lg:top-32">
            <div class="space-y-6">
              <h1 class="font-serif text-5xl md:text-6xl text-white leading-tight">
                Get in touch.
              </h1>
              <p class="text-lg text-gray-400 leading-relaxed font-light max-w-sm">
                We value the written word and the people behind it. Reach out for collaborations, inquiries, or just to share your story.
              </p>
            </div>
          </div>

          <div class="lg:col-span-7 relative">
            <div class="relative bg-surface-dark rounded-2xl p-10 md:p-16 border border-gray-800 shadow-2xl shadow-black/50">
              <form class="space-y-10">
                <div class="group">
                  <label class="block text-xs uppercase tracking-widest text-gray-500 mb-2" for="name">
                    Name
                  </label>
                  <input class="input-minimal" id="name" name="name" placeholder="How should we call you?" type="text" />
                </div>
                <div class="group">
                  <label class="block text-xs uppercase tracking-widest text-gray-500 mb-2" for="email">
                    Email
                  </label>
                  <input class="input-minimal" id="email" name="email" placeholder="Where can we reach you?" type="email" />
                </div>
                <div class="group">
                  <label class="block text-xs uppercase tracking-widest text-gray-500 mb-2" for="message">
                    Message
                  </label>
                  <textarea class="input-minimal resize-none h-32" id="message" name="message" placeholder="Tell us about your project..."></textarea>
                </div>
                <div class="pt-6 flex justify-end">
                  <button
                    class="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 rounded-sm"
                    type="button"
                  >
                    <span>Send Message</span>
                    <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

