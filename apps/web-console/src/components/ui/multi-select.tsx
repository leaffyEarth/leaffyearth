import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

export type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedLabels = selected
    .map(value => options.find(opt => opt.value === value)?.label)
    .filter(Boolean)
    .join(", ")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className="truncate">
            {selectedLabels || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <ScrollArea className="h-[200px] p-2">
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 p-1 hover:bg-accent rounded-md"
              >
                <Checkbox
                  id={option.value}
                  checked={selected.includes(option.value)}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      onChange([...selected, option.value])
                    } else {
                      onChange(selected.filter((value) => value !== option.value))
                    }
                  }}
                />
                <label
                  htmlFor={option.value}
                  className="flex-grow cursor-pointer text-sm"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 