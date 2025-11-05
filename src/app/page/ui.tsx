import type { SliderProps, SwitchProps, TooltipProps } from '@radix-ui/themes'
import { Box, Flex, IconButton, Slider, Switch, Text, Tooltip } from '@radix-ui/themes'
import { Info } from 'lucide-react'

interface UiSwitchProps extends SwitchProps {
  label: string
  tooltip?: string
}

export function UiSwitch(props: UiSwitchProps) {
  const { label, tooltip, ...restProps } = props

  return (
    <Flex asChild align="center" gap="2" width="100%">
      <Text as="label" size="2">
        {tooltip && <UiTooltip.Info content={tooltip} />}
        <Text weight="medium" style={{ flexGrow: 1 }}>
          {label}
        </Text>
        <Switch size="2" {...restProps} />
      </Text>
    </Flex>
  )
}

interface UiSliderProps extends SliderProps {
  label: string
  tooltip?: string
  unit: string
}

export function UiSlider(props: UiSliderProps) {
  const { label, tooltip, unit, ...restProps } = props

  return (
    <Box>
      <Flex align="center" gap="2" mb="2">
        {tooltip && <UiTooltip.Info content={tooltip} />}
        <Text size="2" style={{ flexGrow: 1 }}>
          {label}
        </Text>
        {props.defaultValue && (
          <Text size="2" style={{ opacity: 0.6 }}>
            {props.defaultValue[0]}
            {unit}
          </Text>
        )}
      </Flex>
      <Slider {...restProps} />
    </Box>
  )
}

export function UiTooltip() {}

UiTooltip.Root = (props: TooltipProps) => {
  const { children, ...restProps } = props

  return <Tooltip {...restProps}>{children}</Tooltip>
}

UiTooltip.Info = (props: TooltipProps) => (
  <Tooltip {...props}>
    <IconButton asChild variant="ghost" color="gray" size="1" radius="full" style={{ opacity: 0.6 }} tabIndex={0}>
      <Info size={16} />
    </IconButton>
  </Tooltip>
)
