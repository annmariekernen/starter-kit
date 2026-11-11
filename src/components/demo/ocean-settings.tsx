// A sample screen for the demo page: Oceanos AI, an app for Greek Gods
// running the sea, open to its settings page for Pro user Poseidon.
// It shows the kit's components working together on one realistic page.
// Delete this folder when you start your own app.
import { useState, type ReactNode } from 'react'
import { CircleHelp, LogOut, Download, Eye, Waves, Info } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// A label and hint on the left, a control (switch, select…) on the right
function SettingRow({
  id,
  label,
  hint,
  children,
}: {
  id: string
  label: string
  hint: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>{label}</Label>
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      </div>
      {children}
    </div>
  )
}

// A checkbox with its label and a hint underneath
function CheckRow({
  id,
  label,
  hint,
  defaultChecked,
  disabled,
}: {
  id: string
  label: string
  hint: string
  defaultChecked?: boolean
  disabled?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id={id}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-describedby={`${id}-hint`}
        className="mt-0.5"
      />
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>{label}</Label>
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      </div>
    </div>
  )
}

export function OceanSettings() {
  const [seaState, setSeaState] = useState('wine-dark')

  return (
    <Card>
      {/* App bar: product name on the left, the signed-in user's menu on the right */}
      <div className="flex items-center justify-between gap-4 border-b px-(--card-spacing) pb-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Waves className="size-4" />
          </div>
          <span className="font-heading text-base font-semibold tracking-tight">Oceanos AI</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu for Poseidon">
              <Avatar>
                <AvatarFallback className="bg-secondary text-secondary-foreground">P</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex flex-col gap-1.5 py-2 font-normal">
              <span className="text-sm font-medium text-foreground">Poseidon</span>
              <span className="flex flex-wrap gap-1.5">
                <Badge variant="accent">Olympian</Badge>
                <Badge variant="info">Pro plan</Badge>
              </span>
              <span className="text-xs text-muted-foreground">poseidon@olympus.gr</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast('Now viewing as a mortal', { description: 'Everything looks very large and wet.' })}>
              <Eye /> View as a mortal
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast('Exporting tides', { description: 'tides.csv will arrive by message in a bottle.' })}>
              <Download /> Export tides
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => toast('Signed out of Olympus')}>
              <LogOut /> Sign out of Olympus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">Ocean Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="waves">
          <TabsList className="w-full sm:w-fit">
            <TabsTrigger value="waves">Waves</TabsTrigger>
            <TabsTrigger value="creatures">Creatures</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Waves: select, number field with a tooltip, switches */}
          <TabsContent value="waves" className="flex flex-col gap-6 pt-4">
            <SettingRow id="sea-state" label="Default sea state" hint="What sailors get when you're not paying attention.">
              <Select value={seaState} onValueChange={setSeaState}>
                <SelectTrigger id="sea-state" aria-describedby="sea-state-hint" className="w-48 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="glassy">Glassy calm</SelectItem>
                  <SelectItem value="swell">Gentle swell</SelectItem>
                  <SelectItem value="chop">Moderate chop</SelectItem>
                  <SelectItem value="wine-dark">Wine-dark and brooding</SelectItem>
                  <SelectItem value="odyssey">Full Odyssey</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <div className="flex max-w-xs flex-col gap-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="wave-height">Max wave height (meters)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon-xs" aria-label="About wave height">
                      <CircleHelp />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Anything over 30 needs sign-off from Zeus.</TooltipContent>
                </Tooltip>
              </div>
              <Input id="wave-height" type="number" inputMode="numeric" defaultValue={12} min={0} />
            </div>

            <Separator />

            <SettingRow id="tides" label="Tides" hint="Twice a day, as the moon requested.">
              <Switch id="tides" aria-describedby="tides-hint" defaultChecked />
            </SettingRow>
            <SettingRow id="glow" label="Bioluminescence" hint="Makes the night shift feel special.">
              <Switch id="glow" aria-describedby="glow-hint" defaultChecked />
            </SettingRow>
            <SettingRow id="rogue" label="Rogue waves" hint="Off by default since the incident.">
              <Switch id="rogue" aria-describedby="rogue-hint" />
            </SettingRow>
          </TabsContent>

          {/* Creatures: checkboxes, and skeletons for content still loading */}
          <TabsContent value="creatures" className="flex flex-col gap-6 pt-4">
            <div className="flex flex-col gap-4">
              <CheckRow id="dolphins" label="Dolphins" hint="Required. They run the place." defaultChecked disabled />
              <CheckRow id="octopuses" label="Octopuses" hint="Allowed to escape aquariums." defaultChecked />
              <CheckRow id="sharks" label="Sharks" hint="Misunderstood, mostly." defaultChecked />
              <CheckRow id="krakens" label="Krakens" hint="Released on request only." />
              <CheckRow id="mermaids" label="Mermaids" hint="Pending review by HR." />
            </div>

            <Separator />

            <div className="flex flex-col gap-3" aria-busy="true">
              <p className="text-sm font-medium">Newly discovered species</p>
              <p className="text-sm text-muted-foreground">
                The deep-sea survey is still coming up for air.
              </p>
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-full" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-3.5 w-2/5" />
                    <Skeleton className="h-3 w-3/5" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Notifications: more switches and a select */}
          <TabsContent value="notifications" className="flex flex-col gap-6 pt-4">
            <SettingRow id="n-shipwrecks" label="Shipwrecks" hint="Only the ones that were your fault.">
              <Switch id="n-shipwrecks" aria-describedby="n-shipwrecks-hint" defaultChecked />
            </SettingRow>
            <SettingRow id="n-prayers" label="Sailors praying to you" hint="Batched, or it never stops.">
              <Switch id="n-prayers" aria-describedby="n-prayers-hint" defaultChecked />
            </SettingRow>
            <SettingRow id="n-odysseus" label="Odysseus location updates" hint="Still lost. Updates daily.">
              <Switch id="n-odysseus" aria-describedby="n-odysseus-hint" defaultChecked />
            </SettingRow>
            <SettingRow id="n-zeus" label="Mentions of Zeus" hint="Muted. You know why.">
              <Switch id="n-zeus" aria-describedby="n-zeus-hint" />
            </SettingRow>

            <Separator />

            <SettingRow id="digest" label="Email digest" hint="A summary of everything that got wet.">
              <Select defaultValue="tide">
                <SelectTrigger id="digest" aria-describedby="digest-hint" className="w-48 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tide">Every high tide</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="millennium">Once a millennium</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
          </TabsContent>

          {/* Account: an alert and a destructive action behind a dialog */}
          <TabsContent value="account" className="flex flex-col gap-6 pt-4">
            <Alert variant="info">
              <Info />
              <AlertTitle>Trident under warranty</AlertTitle>
              <AlertDescription>Covered until the end of the Bronze Age.</AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2">
              <Label htmlFor="realm">Realm name</Label>
              <Input id="realm" defaultValue="The Seven Seas" className="max-w-xs" />
            </div>

            <Separator />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Drain the ocean</p>
                <p className="text-sm text-muted-foreground">Permanent. The fish will be very upset.</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Drain the ocean</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Drain the ocean?</DialogTitle>
                    <DialogDescription>
                      This can't be undone, and Atlantis has been through enough already.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Keep the ocean</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={() => toast.error('Request denied', { description: 'The fish have unionized.' })}
                      >
                        Drain it
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="outline" onClick={() => toast('Changes washed away')}>
          Discard
        </Button>
        <Button
          onClick={() =>
            toast.success('Settings saved', { description: 'The tides will update within 6 to 12 hours.' })
          }
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  )
}
