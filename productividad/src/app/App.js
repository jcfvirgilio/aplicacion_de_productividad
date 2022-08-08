import React from 'react';
import MyHeaderNav from './components/dashboard/navigation/HeaderNav'
import TabsNavigation from './components/dashboard/navigation/TabsNavigation'


function App() {

  return (
    <div className="container">
      <header>
        <MyHeaderNav />
      </header>
      <main>
        <section>
          <TabsNavigation />
        </section>
      </main>
      <footer>
        &copy; 2022, Juan Carlos Fuentes
      </footer>
    </div>
  );
}

export default App;
