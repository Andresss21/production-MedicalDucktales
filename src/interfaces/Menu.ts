export interface MenuItem {
    name: string;
    icon: string;
    children?: (ChildrenMenu)[] | null;
    url?: string;
  }
  export interface ChildrenMenu {
    name: string;
    icon: string;
    url: string;
  }
  