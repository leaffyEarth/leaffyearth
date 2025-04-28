param(
    [string]$User = 'leaffyearthdocker',
    [string]$Pass = '3*n@HGz,%;dTMCD'
)

$ErrorActionPreference = 'Stop'

# ─── Log in securely ──────────────────────────────────────────────────────────
$Pass | docker login --username $User --password-stdin

# ─── Tag & push images ────────────────────────────────────────────────────────
foreach ($img in 'infra-frontend','infra-backend') {
  # debug
  $source = "${img}:latest"
  $target = "${User}/leaffy-${img}:latest"

  Write-Output "Tagging $source → $target"
  docker tag $source $target

  Write-Output "Pushing $target"
  docker push $target
}
