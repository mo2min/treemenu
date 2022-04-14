var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import require$$0 from "react";
var tinyDebounce = function debounce(fn, delay) {
  var timeoutID = null;
  return function() {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function() {
      fn.apply(that, args);
    }, delay);
  };
};
var has = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
function isEmpty(val) {
  if (val == null)
    return true;
  if (typeof val == "boolean")
    return false;
  if (typeof val == "number")
    return val === 0;
  if (typeof val == "string")
    return val.length === 0;
  if (typeof val == "function")
    return val.length === 0;
  if (Array.isArray(val))
    return val.length === 0;
  if (val instanceof Error)
    return val.message === "";
  if (val.toString == toString) {
    switch (val.toString()) {
      case "[object File]":
      case "[object Map]":
      case "[object Set]": {
        return val.size === 0;
      }
      case "[object Object]": {
        for (var key in val) {
          if (has.call(val, key))
            return false;
        }
        return true;
      }
    }
  }
  return false;
}
var lib = isEmpty;
var src = { exports: {} };
function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;
  var serializer = options && options.serializer ? options.serializer : serializerDefault;
  var strategy = options && options.strategy ? options.strategy : strategyDefault;
  return strategy(fn, {
    cache,
    serializer
  });
}
function isPrimitive(value) {
  return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
  var strategy = variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
  var strategy = monadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function serializerDefault() {
  return JSON.stringify(arguments);
}
function ObjectWithoutPrototypeCache() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.has = function(key) {
  return key in this.cache;
};
ObjectWithoutPrototypeCache.prototype.get = function(key) {
  return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
  this.cache[key] = value;
};
var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
};
src.exports = memoize;
src.exports.strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};
var memoize$1 = src.exports;
const validateData = (data) => !!data && !lib(data);
const getValidatedData = (data) => validateData(data) ? data : [];
const walk = (_a) => {
  var _b = _a, {
    data
  } = _b, props = __objRest(_b, [
    "data"
  ]);
  const validatedData = getValidatedData(data);
  const propsWithDefaultValues = __spreadValues({
    parent: "",
    level: 0
  }, props);
  const handleArray = (dataAsArray) => dataAsArray.reduce((all, node, index) => {
    const branchProps = __spreadValues({
      node,
      index,
      nodeName: node.key
    }, propsWithDefaultValues);
    const branch = generateBranch(branchProps);
    return [...all, ...branch];
  }, []);
  const handleObject = (dataAsObject) => Object.entries(dataAsObject).sort((a, b) => a[1].index - b[1].index).reduce((all, [nodeName, node]) => {
    const branchProps = __spreadValues({
      node,
      nodeName
    }, propsWithDefaultValues);
    const branch = generateBranch(branchProps);
    return [...all, ...branch];
  }, []);
  return Array.isArray(validatedData) ? handleArray(validatedData) : handleObject(validatedData);
};
const defaultMatchSearch = ({
  label,
  searchTerm
}) => {
  const processString = (text) => text.trim().toLowerCase();
  return processString(label).includes(processString(searchTerm));
};
const defaultLocale = ({
  label
}) => label;
const generateBranch = (_c) => {
  var _d = _c, {
    node,
    nodeName,
    matchSearch = defaultMatchSearch,
    locale = defaultLocale
  } = _d, props = __objRest(_d, [
    "node",
    "nodeName",
    "matchSearch",
    "locale"
  ]);
  const {
    parent,
    level,
    openNodes,
    searchTerm
  } = props;
  const _a = node, {
    nodes,
    label: rawLabel = "unknown"
  } = _a, nodeProps = __objRest(_a, [
    "nodes",
    "label"
  ]);
  const key = [parent, nodeName].filter((x) => x).join("/");
  const hasNodes = validateData(nodes);
  const isOpen = hasNodes && (openNodes.includes(key) || !!searchTerm);
  const label = locale(__spreadValues({
    label: rawLabel
  }, nodeProps));
  const isVisible = !searchTerm || matchSearch(__spreadValues({
    label,
    searchTerm
  }, nodeProps));
  const currentItem = __spreadProps(__spreadValues(__spreadValues({}, props), nodeProps), {
    label,
    hasNodes,
    isOpen,
    key
  });
  const data = getValidatedData(nodes);
  const nextLevelItems = isOpen ? walk(__spreadProps(__spreadValues({
    data,
    locale,
    matchSearch
  }, props), {
    parent: key,
    level: level + 1
  })) : [];
  return isVisible ? [currentItem, ...nextLevelItems] : nextLevelItems;
};
const fastWalk = memoize$1(walk);
const slowWalk = walk;
var classnames = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames2() {
      var classes = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames2.apply(null, arg);
            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          } else {
            classes.push(arg.toString());
          }
        }
      }
      return classes.join(" ");
    }
    if (module.exports) {
      classNames2.default = classNames2;
      module.exports = classNames2;
    } else {
      window.classNames = classNames2;
    }
  })();
})(classnames);
var classNames = classnames.exports;
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 1.75;
const ToggleIcon = ({
  on,
  openedIcon,
  closedIcon
}) => /* @__PURE__ */ jsx("div", {
  role: "img",
  "aria-label": "Toggle",
  className: "rstm-toggle-icon-symbol",
  children: on ? openedIcon : closedIcon
});
const ItemComponent = ({
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
  isRtl = false
}) => {
  return /* @__PURE__ */ jsxs("li", {
    className: classNames("rstm-tree-item", `rstm-tree-item-level${level}`, {
      "rstm-tree-item--active": active
    }, {
      "rstm-tree-item--focused": focused
    }, {
      "rstm-tree-item-rtl": isRtl
    }),
    style: __spreadValues({
      paddingLeft: `${DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 1) + level * LEVEL_SPACE}rem`
    }, style),
    role: "button",
    "aria-pressed": active,
    onClick,
    children: [hasNodes && /* @__PURE__ */ jsx("div", {
      className: "rstm-toggle-icon",
      onClick: (e) => {
        hasNodes && toggleNode && toggleNode();
        e.stopPropagation();
      },
      children: /* @__PURE__ */ jsx(ToggleIcon, {
        on: isOpen,
        openedIcon,
        closedIcon
      })
    }), label]
  });
};
const defaultChildren = ({
  search,
  items,
  isRtl
}) => {
  const onSearch = (e) => {
    const {
      value
    } = e.target;
    search && search(value);
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [search && /* @__PURE__ */ jsx("input", {
      className: "rstm-search",
      "aria-label": "Type and search",
      type: "search",
      placeholder: "Type and search",
      onChange: onSearch
    }), /* @__PURE__ */ jsx("ul", {
      className: "rstm-tree-item-group",
      children: items.map((_a) => {
        var _b = _a, {
          key
        } = _b, props = __objRest(_b, [
          "key"
        ]);
        return /* @__PURE__ */ jsx(ItemComponent, __spreadValues({
          isRtl
        }, props), key);
      })
    })]
  });
};
const KeyDown = ({
  children,
  up,
  down,
  left,
  right,
  enter
}) => {
  return /* @__PURE__ */ jsx("div", {
    tabIndex: 0,
    onKeyDown: (e) => {
      switch (e.key) {
        case "ArrowUp": {
          up();
          break;
        }
        case "ArrowDown": {
          down();
          break;
        }
        case "ArrowLeft": {
          left();
          break;
        }
        case "ArrowRight": {
          right();
          break;
        }
        case "Enter": {
          enter();
          break;
        }
      }
    },
    children
  });
};
const defaultOnClick = (props) => console.log(props);
class TreeMenu extends require$$0.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      openNodes: this.props.initialOpenNodes || [],
      searchTerm: "",
      activeKey: this.props.initialActiveKey || "",
      focusKey: this.props.initialFocusKey || ""
    });
    __publicField(this, "resetOpenNodes", (newOpenNodes, activeKey, focusKey) => {
      const {
        initialOpenNodes
      } = this.props;
      const openNodes = Array.isArray(newOpenNodes) && newOpenNodes || initialOpenNodes || [];
      this.setState({
        openNodes,
        searchTerm: "",
        activeKey: activeKey || "",
        focusKey: focusKey || activeKey || ""
      });
    });
    __publicField(this, "search", (value) => {
      const {
        debounceTime
      } = this.props;
      const search = tinyDebounce((searchTerm) => this.setState({
        searchTerm
      }), debounceTime);
      search(value);
    });
    __publicField(this, "toggleNode", (node) => {
      if (!this.props.openNodes) {
        const {
          openNodes
        } = this.state;
        const newOpenNodes = openNodes.includes(node) ? openNodes.filter((openNode) => openNode !== node) : [...openNodes, node];
        this.setState({
          openNodes: newOpenNodes
        });
      }
    });
    __publicField(this, "generateItems", () => {
      const {
        data,
        onClickItem,
        locale,
        matchSearch
      } = this.props;
      const {
        searchTerm
      } = this.state;
      const openNodes = this.props.openNodes || this.state.openNodes;
      const activeKey = this.props.activeKey || this.state.activeKey;
      const focusKey = this.props.focusKey || this.state.focusKey;
      const defaultSearch = this.props.cacheSearch ? fastWalk : slowWalk;
      const items = data ? defaultSearch({
        data,
        openNodes,
        searchTerm,
        locale,
        matchSearch
      }) : [];
      return items.map((item) => {
        const focused = item.key === focusKey;
        const active = item.key === activeKey;
        const onClick = () => {
          const newActiveKey = this.props.activeKey || item.key;
          this.setState({
            activeKey: newActiveKey,
            focusKey: newActiveKey
          });
          onClickItem && onClickItem(item);
        };
        const toggleNode = item.hasNodes ? () => this.toggleNode(item.key) : void 0;
        return __spreadProps(__spreadValues({}, item), {
          focused,
          active,
          onClick,
          toggleNode
        });
      });
    });
    __publicField(this, "getKeyDownProps", (items) => {
      const {
        onClickItem
      } = this.props;
      const {
        focusKey,
        activeKey,
        searchTerm
      } = this.state;
      const focusIndex = items.findIndex((item) => item.key === (focusKey || activeKey));
      const getFocusKey = (item) => {
        const keyArray = item.key.split("/");
        return keyArray.length > 1 ? keyArray.slice(0, keyArray.length - 1).join("/") : item.key;
      };
      return {
        up: () => {
          this.setState(({
            focusKey: focusKey2
          }) => ({
            focusKey: focusIndex > 0 ? items[focusIndex - 1].key : focusKey2
          }));
        },
        down: () => {
          this.setState(({
            focusKey: focusKey2
          }) => ({
            focusKey: focusIndex < items.length - 1 ? items[focusIndex + 1].key : focusKey2
          }));
        },
        left: () => {
          const item = items[focusIndex];
          if (item) {
            this.setState((_a) => {
              var _b = _a, {
                openNodes
              } = _b, rest = __objRest(_b, [
                "openNodes"
              ]);
              const newOpenNodes = openNodes.filter((node) => node !== item.key);
              return item.isOpen ? __spreadProps(__spreadValues({}, rest), {
                openNodes: newOpenNodes,
                focusKey: item.key
              }) : __spreadProps(__spreadValues({}, rest), {
                focusKey: getFocusKey(item)
              });
            });
          }
        },
        right: () => {
          const {
            hasNodes,
            key
          } = items[focusIndex];
          if (hasNodes)
            this.setState(({
              openNodes
            }) => ({
              openNodes: [...openNodes, key]
            }));
        },
        enter: () => {
          this.setState(({
            focusKey: focusKey2
          }) => ({
            activeKey: focusKey2
          }));
          onClickItem && onClickItem(items[focusIndex]);
        }
      };
    });
  }
  componentDidUpdate(prevProps) {
    const {
      data,
      initialOpenNodes,
      resetOpenNodesOnDataUpdate
    } = this.props;
    if (prevProps.data !== data && resetOpenNodesOnDataUpdate && initialOpenNodes) {
      this.setState({
        openNodes: initialOpenNodes
      });
    }
  }
  render() {
    const {
      children,
      hasSearch,
      disableKeyboard,
      isRtl
    } = this.props;
    const {
      searchTerm
    } = this.state;
    const search = this.search;
    const items = this.generateItems();
    const resetOpenNodes = this.resetOpenNodes;
    const render = children || defaultChildren;
    const renderProps = hasSearch ? {
      search,
      resetOpenNodes,
      items,
      searchTerm,
      isRtl
    } : {
      items,
      resetOpenNodes
    };
    return disableKeyboard ? render(renderProps) : /* @__PURE__ */ jsx(KeyDown, __spreadProps(__spreadValues({}, this.getKeyDownProps(items)), {
      children: render(renderProps)
    }));
  }
}
__publicField(TreeMenu, "defaultProps", {
  data: {},
  onClickItem: defaultOnClick,
  debounceTime: 125,
  children: defaultChildren,
  hasSearch: true,
  cacheSearch: true,
  resetOpenNodesOnDataUpdate: false,
  disableKeyboard: false
});
export { ItemComponent, KeyDown, TreeMenu as default, defaultChildren };
