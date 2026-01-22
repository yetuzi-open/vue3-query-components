import type { VNode } from "vue";
import type { AnyObject, UnionToRecord } from "../../index";
import dayjs from "dayjs";
import type { CommonTableColumnRoot, TableColumnTypeDict } from "./type";

type SupplementType = UnionToRecord<CommonTableColumnRoot<AnyObject>, "type">;

export type SupplementTypeObject = {
  [K in keyof SupplementType]: Partial<
    Omit<SupplementType[K], "prop" | "formatter">
  > & {
    formatter?: (
      row: AnyObject,
      column: SupplementType[K],
      cellValue: any,
      index: number,
    ) => VNode | string | number;
  };
};

/**
 * 字典选项类型
 */
export type DictOption = {
  /** 显示的标签文本 */
  label: string;
  /** 对应的值 */
  value: any;
};

/**
 * 字典列配置类型
 * 扩展自字典列类型，用于运行时配置
 */
export type DictColumnConfig = TableColumnTypeDict<AnyObject> & {
  /** 字典选项列表 */
  options?: DictOption[];
  /** 字典名称，用于从全局字典服务获取选项 */
  dictName?: string;
};

/**
 * 列配置类型
 * 定义列的通用配置属性
 */
type ColumnConfig = {
  /** 列标题 */
  label?: string;
  /** 列宽度 */
  width?: string;
  /** 格式化函数 */
  formatter?: (
    row: AnyObject,
    column: any,
    cellValue: any,
    index: number,
  ) => VNode | string | number;
};

/**
 * 列配置工厂函数类型
 * 接收原始列配置，返回对应的列配置
 */
type ColumnConfigFactory = (originalColumn?: AnyObject) => ColumnConfig;

/**
 * 创建索引列配置
 * 索引列自动显示行号
 */
function createIndexColumnConfig(_originalColumn?: AnyObject): ColumnConfig {
  return { label: "序号" };
}

/**
 * 创建选择列配置
 * 提供多选功能
 */
function createSelectionColumnConfig(
  _originalColumn?: AnyObject,
): ColumnConfig {
  return {};
}

/**
 * 创建展开列配置
 * 提供行展开功能
 */
function createExpandColumnConfig(_originalColumn?: AnyObject): ColumnConfig {
  return {};
}

/**
 * 创建日期列配置
 * 自动格式化日期显示
 */
function createDateColumnConfig(_originalColumn?: AnyObject): ColumnConfig {
  return {
    width: "140px",
    formatter(row: AnyObject, column: any, cellValue: any) {
      return dayjs(cellValue).format("YYYY-MM-DD");
    },
  };
}

/**
 * 创建日期时间列配置
 * 自动格式化日期时间显示
 */
function createDateTimeColumnConfig(_originalColumn?: AnyObject): ColumnConfig {
  return {
    width: "180px",
    formatter(row: AnyObject, column: any, cellValue: any) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
  };
}

/**
 * 创建字典列配置
 * 根据配置的字典选项，将值转换为对应的标签显示
 *
 * @param originalColumn - 原始列配置，包含 options 等属性
 * @returns 字典列配置
 *
 * @example
 * ```ts
 * const column: DictColumnConfig = {
 *   type: 'dict',
 *   prop: 'status',
 *   options: [
 *     { label: '启用', value: 1 },
 *     { label: '禁用', value: 0 }
 *   ]
 * }
 *
 * const config = createDictColumnConfig(column)
 * config.formatter({ status: 1 }, null, 1, 0) // 返回 '启用'
 * ```
 */
function createDictColumnConfig(originalColumn?: AnyObject): ColumnConfig {
  return {
    width: "120px",
    formatter: createDictFormatter(
      originalColumn as DictColumnConfig | undefined,
    ),
  };
}

/**
 * 创建字典列的 formatter 函数
 * 通过闭包捕获原始列配置，以便在 formatter 中访问字典选项
 *
 * @param originalColumn - 原始列配置，包含 options 等属性
 * @returns formatter 函数
 */
function createDictFormatter(originalColumn?: DictColumnConfig) {
  return function dictFormatter(
    row: AnyObject,
    column: any,
    cellValue: any,
    index: number,
  ): VNode | string | number {
    // 如果有 options，从 options 中查找对应的 label
    if (originalColumn?.options && Array.isArray(originalColumn.options)) {
      const option = originalColumn.options.find(
        (opt: DictOption) => opt.value === cellValue,
      );
      return option?.label ?? cellValue;
    }

    // 如果有 dictName，可以从全局字典服务获取
    // TODO: 可以在这里集成全局字典服务
    // if (originalColumn?.dictName) {
    //   return getDictLabel(originalColumn.dictName, cellValue)
    // }

    return cellValue;
  };
}

/**
 * 内置列类型配置工厂映射
 * 使用 Map 存储类型到工厂函数的映射
 * 每个工厂函数通过闭包接收原始列配置，返回对应的列配置
 *
 * 这种设计的优势：
 * 1. 所有列类型使用统一的创建模式
 * 2. formatter 可以通过闭包访问原始列配置
 * 3. 扩展新类型只需添加新的工厂函数
 * 4. 便于单元测试
 */
const columnSupplementTypeMap = new Map<string, ColumnConfigFactory>([
  ["index", createIndexColumnConfig],
  ["selection", createSelectionColumnConfig],
  ["expand", createExpandColumnConfig],
  ["date", createDateColumnConfig],
  ["dateTime", createDateTimeColumnConfig],
  ["dict", createDictColumnConfig],
]);

/**
 * 获取列类型的补充配置
 *
 * 统一的配置获取接口：
 * - 所有类型都通过工厂函数创建配置
 * - 工厂函数通过闭包可以访问原始列配置
 * - 便于扩展新的列类型
 *
 * @param type - 列类型标识
 * @param originalColumn - 原始列配置，用于需要访问原始数据的类型（如 dict）
 * @returns 对应的列配置，如果类型不存在则返回 undefined
 *
 * @example
 * ```ts
 * // 获取索引列配置
 * const indexConfig = getColumnSupplementType('index')
 * // { label: '序号' }
 *
 * // 获取字典列配置（需要传入原始列配置）
 * const dictColumn: DictColumnConfig = {
 *   type: 'dict',
 *   prop: 'status',
 *   options: [{ label: '启用', value: 1 }]
 * }
 * const dictConfig = getColumnSupplementType('dict', dictColumn)
 * // { width: '120px', formatter: Function }
 * ```
 */
export function getColumnSupplementType(
  type: string,
  originalColumn?: AnyObject,
): ColumnConfig | undefined {
  const factory = columnSupplementTypeMap.get(type);

  if (factory) {
    return factory(originalColumn);
  }

  return undefined;
}

/**
 * 注册自定义列类型配置工厂
 * 允许用户扩展新的列类型
 *
 * @param type - 列类型标识
 * @param factory - 列配置工厂函数
 *
 * @example
 * ```ts
 * // 注册自定义货币列类型
 * registerColumnTypeConfig('currency', (originalColumn) => ({
 *   width: '120px',
 *   formatter: (row, column, cellValue) => {
 *     return `¥${cellValue.toFixed(2)}`
 *   }
 * }))
 *
 * // 使用
 * const columns = [{
 *   type: 'currency',
 *   prop: 'price',
 *   label: '价格'
 * }]
 * ```
 */
export function registerColumnTypeConfig(
  type: string,
  factory: ColumnConfigFactory,
): void {
  columnSupplementTypeMap.set(type, factory);
}
