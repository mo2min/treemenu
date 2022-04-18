import React, { ReactNode } from "react";
import classNames from "classnames";

import { Item } from "./walk";

const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 1.75;
const ToggleIcon = ({
  on,
  openedIcon,
  closedIcon,
}: {
  on: boolean;
  openedIcon: ReactNode;
  closedIcon: ReactNode;
}) => (
  <div role="img" aria-label="Toggle" className="rstm-toggle-icon-symbol">
    {on ? openedIcon : closedIcon}
  </div>
);

export interface TreeMenuItem extends Item {
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  toggleNode?: () => void;
}

export type TreeMenuChildren = (props: {
  search?: (term: string) => void;
  isRtl?: boolean;
  isOneLevel?: boolean;
  searchTerm?: string;
  searchPlaceholder?: string;
  items: TreeMenuItem[];
  resetOpenNodes?: (openNodes?: string[]) => void;
}) => JSX.Element;

export const ItemComponent: React.FunctionComponent<TreeMenuItem> = ({
  hasNodes = false,
  isOpen = false,
  level = 0,
  onClick,
  toggleNode,
  active,
  focused,
  openedIcon = "-",
  closedIcon = "+",
  label = "unknown",
  style = {},
  isRtl = false,
  isOneLevel = false,
}) => {
  const padding = `${
    DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 1) + level * LEVEL_SPACE
  }rem`;

  const styleRight = { paddingRight: !isOneLevel && padding, ...style };
  const styleLeft = { paddingLeft: !isOneLevel && padding, ...style };
  return (
    <li
      className={classNames(
        "rstm-tree-item",
        `rstm-tree-item-level${level}`,
        { "rstm-tree-item--active": active },
        { "rstm-tree-item--focused": focused },
        { "rstm-tree-item-rtl": isRtl },
        { "rstm-tree-item-onlevel": isOneLevel }
      )}
      style={isRtl ? styleRight : styleLeft}
      role="button"
      aria-pressed={active}
      onClick={onClick}
    >
      {hasNodes && (
        <div
          className="rstm-toggle-icon"
          onClick={(e) => {
            hasNodes && toggleNode && toggleNode();
            e.stopPropagation();
          }}
        >
          <ToggleIcon
            on={isOpen}
            openedIcon={openedIcon}
            closedIcon={closedIcon}
          />
        </div>
      )}
      {label}
    </li>
  );
};

export const defaultChildren: TreeMenuChildren = ({ search, items, isRtl,isOneLevel,searchPlaceholder }) => {
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    search && search(value);
  };

  return (
    <>
      {search && (
        <input
          className="rstm-search"
          aria-label={searchPlaceholder? searchPlaceholder : "Type and search"}
          type="search"
          placeholder={searchPlaceholder? searchPlaceholder : "Type and search"}
          onChange={onSearch}
        />
      )}
      <ul className="rstm-tree-item-group">
        {items.map(({ key, ...props }) => (
          <ItemComponent key={key} isRtl={isRtl} isOneLevel={isOneLevel} {...props} ></ItemComponent>
        ))}
      </ul>
    </>
  );
};
