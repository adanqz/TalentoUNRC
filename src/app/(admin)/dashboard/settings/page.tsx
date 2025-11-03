
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Gemini API Key</CardTitle>
                    <CardDescription>
                        Ingresa tu clave de API de Google Gemini para habilitar las funcionalidades de IA.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <Label htmlFor="api-key">Clave de API</Label>
                        <Input id="api-key" type="password" defaultValue="YOUR_API_KEY" />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Guardar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
