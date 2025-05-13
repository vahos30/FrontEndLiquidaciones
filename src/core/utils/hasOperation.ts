interface Operation {
    name: string;
    id: number;
  }
  
interface MenuItem {
    title: string;
    apiRoute: string;
    parentMenu: boolean;
    subMenu: MenuItem[];
    operations: Operation[];
    id: number;
  }

  interface MenuState {
    title: string;
    menu: MenuItem[];
    id: number;
  }
  /**
   * Verifica si una operación existe en el menú o sus submenús.   
   * @param menuId - ID del menú a buscar.
   * @param operationName - Nombre de la operación.
   * @returns boolean - `true` si la operación existe, `false` si no.
   */
  export const hasOperation = (state: MenuState | null | undefined, menuId: number, operationName: string): boolean => {
    if (!state || !state.menu) {     
      return false;
    };
    const searchInMenu = (menuList: MenuItem[]): boolean => {
      for (const menu of menuList) {
        // Verificar si el menú tiene el ID buscado
        if (menu.id === menuId) {
          // Buscar si la operación existe en el menú actual
          if (menu.operations.some(op => op.name === operationName)) {
            return true;
          }
        }
  
        // Si tiene submenús, buscar recursivamente
        if (menu.subMenu.length > 0) {
          if (searchInMenu(menu.subMenu)) {
            return true;
          }
        }
      }
      return false;
    };     
    return searchInMenu(state.menu);
  };
  
