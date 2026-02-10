import type { AnyObject, UnionToRecord } from "../../index";
import dayjs from "dayjs";
import type { CommonTableColumnRoot } from "./type";
import type { TableColumnCtx } from 'element-plus'

type SupplementType = UnionToRecord<CommonTableColumnRoot<AnyObject>, "type">;

/**
 * 列类型配置工厂函数类型
 * 接收原始列配置，返回 Element Plus Table 列的部分配置
 */
type ColumnConfigFactory<T = AnyObject> = (
  originalColumn: T
) => Partial<TableColumnCtx>;

/**
 * 内置列类型配置工厂映射类型
 * 将列类型标识映射到对应的配置工厂函数
 */
type BuiltinColumnTypeFactoriesType = {
  [K in keyof SupplementType]: ColumnConfigFactory<SupplementType[K]>;
};

/**
 * 内置列类型配置工厂映射
 * 统一管理所有内置列类型的配置生成逻辑
 *
 * 优势：
 * 1. 集中管理所有列类型的配置，便于查找和维护
 * 2. 每个类型通过闭包可以访问原始列配置
 * 3. 扩展新类型只需添加新的属性
 * 4. 类型安全，TypeScript 会检查所有必需的类型
 */
export const builtinColumnTypeFactories: BuiltinColumnTypeFactoriesType = {
  default: () => ({}),
  /** 索引列 - 自动显示行号 */
  index: () => ({
    label: "序号",
  }),

  /** 选择列 - 提供多选功能 */
  selection: () => ({}),

  /** 展开列 - 提供行展开功能 */
  expand: () => ({}),

  /** 日期列 - 自动格式化日期显示 */
  date: () => ({
    width: "140px",
    formatter(row, column, cellValue) {
      return dayjs(cellValue).format("YYYY-MM-DD");
    },
  }),

  /** 日期时间列 - 自动格式化日期时间显示 */
  dateTime: () => ({
    width: "180px",
    formatter(row, column, cellValue) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
  }),

  /** 字典列 - 根据配置的字典选项，将值转换为对应的标签显示 */
  dict: (originalColumn) => ({
    width: "120px",
    formatter(row, column, cellValue){
      // 如果有 options，从 options 中查找对应的 label
      if (Array.isArray(originalColumn.options)) {
        const option = originalColumn.options.find(
          (opt) => opt.value === cellValue,
        );
        return option?.label || String(cellValue);
      }
      // 如果有 dictName，可以从全局字典服务获取
      // TODO: 可以在这里集成全局字典服务
      // if (originalColumn?.dictName) {
      //   return getDictLabel(originalColumn.dictName, cellValue)
      // }
      return String(cellValue);
    },
  }),
};
