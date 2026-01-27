<template>
  <div class="space-y-6">
    <!-- Actions -->
    <div class="glass-card p-4 flex items-center justify-between">
      <div class="text-sm text-gray-300">
        <span class="font-medium">{{ totalLogos }}</span> logos au total
      </div>
      <div class="flex gap-3">
        <Button variant="secondary" @click="handleReset" :disabled="isSaving">
          ↺ Réinitialiser
        </Button>
        <Button variant="primary" @click="handleSave" :loading="isSaving">
          💾 Sauvegarder
        </Button>
        <Button variant="primary" @click="handleExportPDF" :loading="isExporting">
          📄 Exporter PDF
        </Button>
      </div>
    </div>

    <!-- Tiers -->
    <TierRow
      v-for="tier in tiers"
      :key="tier"
      :tier="tier"
      :logos="tierListData.tiers[tier] || []"
      :is-over="dropTarget === tier"
      :dragging-logo-id="draggingLogo?.id"
      @drop="handleDrop(tier)"
    />

    <!-- Logos non assignés -->
    <UnassignedLogos
      :logos="unassignedLogos"
      :is-over="dropTarget === 'unassigned'"
      :dragging-logo-id="draggingLogo?.id"
      @drop="handleDrop(null)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { tierListService } from '@/services/tierlist.service'
import TierRow from './TierRow.vue'
import UnassignedLogos from './UnassignedLogos.vue'
import Button from '@/components/ui/Button.vue'

const tiers = ['S', 'A', 'B', 'C', 'D']

const tierListData = ref({ tiers: {} })
const availableLogos = ref([])
const draggingLogo = ref(null)
const dropTarget = ref(null)
const isSaving = ref(false)
const isExporting = ref(false)

const totalLogos = computed(() => availableLogos.value.length)

const unassignedLogos = computed(() => {
  const assignedIds = new Set()
  Object.values(tierListData.value.tiers).forEach(logos => {
    logos.forEach(logo => assignedIds.add(logo.id))
  })
  return availableLogos.value.filter(logo => !assignedIds.has(logo.id))
})

const loadData = async () => {
  try {
    const [tierList, logos] = await Promise.all([
      tierListService.getTierList(),
      tierListService.getAvailableLogos()
    ])
    tierListData.value = tierList
    availableLogos.value = logos
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
    alert('Erreur lors du chargement des données')
  }
}

const handleDrop = (targetTier) => {
  if (!draggingLogo.value) return

  // Retirer le logo de son tier actuel
  Object.keys(tierListData.value.tiers).forEach(tier => {
    tierListData.value.tiers[tier] = tierListData.value.tiers[tier].filter(
      logo => logo.id !== draggingLogo.value.id
    )
  })

  // Ajouter au nouveau tier
  if (targetTier) {
    if (!tierListData.value.tiers[targetTier]) {
      tierListData.value.tiers[targetTier] = []
    }
    tierListData.value.tiers[targetTier].push(draggingLogo.value)
  }

  draggingLogo.value = null
  dropTarget.value = null
}

const handleSave = async () => {
  isSaving.value = true
  try {
    const tiersToSave = {}
    Object.keys(tierListData.value.tiers).forEach(tier => {
      tiersToSave[tier] = tierListData.value.tiers[tier].map(logo => logo.id)
    })
    await tierListService.updateTierList(tiersToSave)
    alert('Tier list sauvegardée avec succès !')
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde')
  } finally {
    isSaving.value = false
  }
}

const handleExportPDF = async () => {
  isExporting.value = true
  try {
    const result = await tierListService.generatePDF()
    
    if (result.url) {
      window.open(result.url, '_blank')
    }
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error)
    alert('Erreur lors de l\'export PDF')
  } finally {
    isExporting.value = false
  }
}

const handleReset = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser ?')) {
    tierListData.value = { tiers: {} }
  }
}

// Setup drag and drop avec événements natifs
onMounted(() => {
  loadData()

  document.addEventListener('dragstart', (e) => {
    const target = e.target.closest('.logo-card')
    if (target) {
      const logoId = target.dataset.logoId
      draggingLogo.value = availableLogos.value.find(l => l.id === logoId)
    }
  })

  document.addEventListener('dragover', (e) => {
    e.preventDefault()
    const tierRow = e.target.closest('.tier-row')
    if (tierRow) {
      dropTarget.value = tierRow.dataset.tier
    }
  })

  document.addEventListener('drop', (e) => {
    e.preventDefault()
    const tierRow = e.target.closest('.tier-row')
    if (tierRow) {
      handleDrop(tierRow.dataset.tier)
    }
  })
})
</script>
