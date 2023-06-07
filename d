{
    "SecurityGroups": [
        {
            "Description": "launch-wizard-1 created 2016-06-21T14:52:03.647+02:00",
            "GroupName": "launch-wizard-1",
            "IpPermissions": [
                {
                    "IpProtocol": "-1",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "UserIdGroupPairs": []
                }
            ],
            "OwnerId": "278150471623",
            "GroupId": "sg-0e79a766",
            "IpPermissionsEgress": [
                {
                    "IpProtocol": "-1",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "UserIdGroupPairs": []
                }
            ],
            "VpcId": "vpc-4d476824"
        },
        {
            "Description": "default VPC security group",
            "GroupName": "default",
            "IpPermissions": [
                {
                    "FromPort": 5432,
                    "IpProtocol": "tcp",
                    "IpRanges": [
                        {
                            "CidrIp": "82.50.103.18/32"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "ToPort": 5432,
                    "UserIdGroupPairs": []
                },
                {
                    "IpProtocol": "-1",
                    "IpRanges": [],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "UserIdGroupPairs": [
                        {
                            "GroupId": "sg-dfd018b7",
                            "UserId": "278150471623"
                        }
                    ]
                }
            ],
            "OwnerId": "278150471623",
            "GroupId": "sg-dfd018b7",
            "IpPermissionsEgress": [
                {
                    "IpProtocol": "-1",
                    "IpRanges": [
                        {
                            "CidrIp": "0.0.0.0/0"
                        }
                    ],
                    "Ipv6Ranges": [],
                    "PrefixListIds": [],
                    "UserIdGroupPairs": []
                }
            ],
            "VpcId": "vpc-4d476824"
        }
    ]
}
