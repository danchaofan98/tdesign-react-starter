/**
 * @desc 使用动态图表的钩子
 */
import { useMemo } from 'react';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';
import { getChartColor } from 'utils/color';
import { CHART_COLORS } from 'configs/color';
import lodashSet from 'lodash/set';
import lodashMap from 'lodash/map';
import { ETheme } from '../types';

export type TChartColorKey = keyof (typeof CHART_COLORS)[ETheme.light]; // "textColor" | "placeholderColor" | "borderColor" | "containerColor"
/**
 * 根据当前主题色返回动态的图表颜色列表
 * @param options 图表的固定配置
 * @param configs 需要动态变换颜色的字段
 * @returns string[]
 */
export default function useDynamicChart(
  options: Record<string, any>,
  configs?: Partial<Record<TChartColorKey, Array<string>>>,
) {
  const { theme, color } = useAppSelector(selectGlobal);

  return useMemo(() => {
    // 获取动态的图表颜色
    const dynamicColor = getChartColor(theme, color);
    // 定义新的图表配置项目
    const newOptions = {
      ...options,
    };

    // 设置动态的图表颜色
    lodashSet(newOptions, 'color', dynamicColor.colorList);

    // 替换图表部分指定的颜色配置项
    if (configs) {
      lodashMap(configs, (config, configKey: TChartColorKey) => {
        config?.map((val) => lodashSet(newOptions, val, dynamicColor[configKey]));
      });
    }
    // 向 newOptions 中添加主题色配置项（如：legend.textStyle.color: red）用于覆盖原来的颜色

    // 自定义钩子的返回值，返回新的图表配置项
    return newOptions;
  }, [theme, color, options]);
}
