import React from "react";
import { Item } from "./walk";
export interface TreeMenuItem extends Item {
    active?: boolean;
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
    toggleNode?: () => void;
}
export declare type TreeMenuChildren = (props: {
    search?: (term: string) => void;
    isRtl?: boolean;
    isOneLevel?: boolean;
    searchTerm?: string;
    searchPlaceholder?: string;
    items: TreeMenuItem[];
    resetOpenNodes?: (openNodes?: string[]) => void;
}) => JSX.Element;
export declare const ItemComponent: React.FunctionComponent<TreeMenuItem>;
export declare const defaultChildren: TreeMenuChildren;
