package com.ssafy.economius.game.entity.redis;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Portfolio {

    private Long player;
    private int money;
    private int totalMoney;
    private PortfolioGold gold;
    private PortfolioSavings savings;
    private PortfolioBuildings buildings;
    private PortfolioStocks stocks;
    private PortfolioInsurances insurances;

    public void updateTotalMoney() {
        this.totalMoney =
            gold.getTotalPrice() +
                savings.getTotalPrice() +
                buildings.getTotalPrice() +
                stocks.getTotalPrice() +
                money;
    }

    public void buyBuilding(Long player, int buildingId, Building building) {
        building.setOwnerId(player);
        this.money -= building.getBuildingFee();
        this.buildings.buyBuilding(buildingId, building);
    }

    public void sellBuilding(int buildingId, Building building) {
        building.setOwnerId(null);
        this.money += building.getBuildingFee();
        this.buildings.sellBuilding(buildingId, building);
    }

    @Override
    public String toString() {
        return "Portfolio{" +
                "player=" + player +
                ", money=" + money +
                ", totalMoney=" + totalMoney +
                ", gold=" + gold +
                ", savings=" + savings +
                ", buildings=" + buildings +
                ", stocks=" + stocks +
                ", insurances=" + insurances +
                '}';
    }
}