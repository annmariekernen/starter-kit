import { Info, Moon, Sparkles, Sun, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { OceanSettings } from '@/components/demo/ocean-settings'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Toaster } from '@/components/ui/sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { themes, useTheme, type Theme } from '@/hooks/use-theme'

// Display names for the theme picker
const themeNames: Record<Theme, string> = {
  default: 'Default',
  galazio: 'Galazio',
}

// The color tokens defined in the theme files, shown as swatches.
const colorTokens = [
  'background',
  'foreground',
  'primary',
  'secondary',
  'muted',
  'accent',
  'destructive',
  'border',
]

// Tailwind's text sizes, largest first
const textSizes = [
  { name: 'text-4xl', px: 36 },
  { name: 'text-3xl', px: 30 },
  { name: 'text-2xl', px: 24 },
  { name: 'text-xl', px: 20 },
  { name: 'text-lg', px: 18 },
  { name: 'text-base', px: 16 },
  { name: 'text-sm', px: 14 },
  { name: 'text-xs', px: 12 },
]

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl font-medium">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function App() {
  const { mode, toggleMode, theme, setTheme } = useTheme()
  const nextMode = mode === 'dark' ? 'light' : 'dark'

  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-14 px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Starter Kit</h1>
          <p className="text-muted-foreground">
            React · TypeScript · Tailwind · shadcn/ui
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
            <SelectTrigger aria-label="Theme" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map((name) => (
                <SelectItem key={name} value={name}>
                  {themeNames[name]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMode}
                aria-label={`Switch to ${nextMode} mode`}
              >
                {mode === 'dark' ? <Sun /> : <Moon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Switch to {nextMode} mode</TooltipContent>
          </Tooltip>
        </div>
      </header>

      <Section
        title="Sample screen"
        description="A settings page built only from the kit's components. Try the tabs, the menu and the buttons."
      >
        <OceanSettings />
      </Section>

      <Section title="Typography" description="The theme's fonts and Tailwind's text sizes.">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-xl border p-5">
            <code className="text-xs text-muted-foreground">font-heading</code>
            <p className="font-heading text-3xl leading-tight">The wine-dark sea</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border p-5">
            <code className="text-xs text-muted-foreground">font-serif</code>
            <p className="font-serif text-lg leading-snug">
              For quotes, pull-outs and the occasional dramatic moment.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border p-5">
            <code className="text-xs text-muted-foreground">font-sans</code>
            <p className="text-base">
              Body text for everything else: labels, buttons, paragraphs and the fine print.
            </p>
          </div>
        </div>
        <div className="flex flex-col divide-y">
          {textSizes.map(({ name, px }) => (
            <div key={name} className="flex items-baseline gap-4 py-2.5">
              <code className="w-28 shrink-0 text-xs text-muted-foreground">
                {name} · {px}px
              </code>
              <p className={`${name} truncate`}>Calm seas and a following wind</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Color tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colorTokens.map((token) => (
            <div key={token} className="flex flex-col gap-2">
              <div
                className="h-14 rounded-lg border"
                style={{ background: `var(--${token})` }}
              />
              <code className="text-xs text-muted-foreground">--{token}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons & badges">
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Section>

      <Section title="Alerts & toasts">
        <div className="flex max-w-xl flex-col gap-3">
          <Alert>
            <Sparkles />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>A quiet note that sits in the page.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Tinted with the secondary color, for tips and notes.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>Destructive</AlertTitle>
            <AlertDescription>For errors and anything that needs fixing.</AlertDescription>
          </Alert>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => toast.success('Message sent', { description: 'Toasts stack, pause on hover and can be dismissed.' })}
          >
            Show a toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error('Something went wrong', { description: 'Error toasts get their own icon.' })}
          >
            Show an error toast
          </Button>
        </div>
      </Section>

      {/* Where toasts appear; it follows the light/dark toggle */}
      <Toaster theme={mode} />
    </div>
  )
}

export default App
