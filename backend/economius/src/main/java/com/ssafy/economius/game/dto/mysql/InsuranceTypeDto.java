package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsuranceTypeDto {

    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
}
